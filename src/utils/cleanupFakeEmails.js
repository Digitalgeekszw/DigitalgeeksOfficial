import mongoose from "mongoose";
import Contact from "../models/Contact";
import ReceivedEmail from "../models/ReceivedEmail";
import { classifyContactSubmission, classifyInboundEmail } from "./spamFilter";

const CLEANUP_FLAG_ID = "cleanup_fake_emails_v1";
const KNOWN_SPAM_EMAILS = new Set([
  "o.lo.la.c4.305@gmail.com",
]);

let started = false;

function isKnownSpamContact(contact) {
  const email = String(contact.email || "").trim().toLowerCase();
  if (KNOWN_SPAM_EMAILS.has(email)) return true;
  return classifyContactSubmission(contact) === "spam";
}

function isJunkReceivedEmail(email) {
  return classifyInboundEmail(email) !== "inbox";
}

export async function deleteFakeEmails() {
  const [contacts, emails] = await Promise.all([
    Contact.find({}).select("firstName lastName company email message").lean(),
    ReceivedEmail.find({}).select("from subject text html").lean(),
  ]);

  const spamContactIds = contacts.filter(isKnownSpamContact).map((doc) => doc._id);
  const junkEmailIds = emails.filter(isJunkReceivedEmail).map((doc) => doc._id);

  const [contactResult, emailResult] = await Promise.all([
    spamContactIds.length ? Contact.deleteMany({ _id: { $in: spamContactIds } }) : { deletedCount: 0 },
    junkEmailIds.length ? ReceivedEmail.deleteMany({ _id: { $in: junkEmailIds } }) : { deletedCount: 0 },
  ]);

  return {
    contactsScanned: contacts.length,
    emailsScanned: emails.length,
    contactsDeleted: contactResult.deletedCount || 0,
    emailsDeleted: emailResult.deletedCount || 0,
  };
}

export async function cleanupFakeEmailsOnce() {
  if (started) return null;
  started = true;

  try {
    const flags = mongoose.connection.db.collection("internal_flags");
    const existing = await flags.findOne({ _id: CLEANUP_FLAG_ID });
    if (existing) return existing.result || { skipped: true };

    const result = await deleteFakeEmails();
    await flags.updateOne(
      { _id: CLEANUP_FLAG_ID },
      { $set: { result, ranAt: new Date() } },
      { upsert: true }
    );
    console.log("Fake email cleanup result:", result);
    return result;
  } catch (error) {
    started = false;
    console.error("Fake email cleanup failed:", error);
    throw error;
  }
}
