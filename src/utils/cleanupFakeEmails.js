import mongoose from "mongoose";
import Contact from "../models/Contact";
import ReceivedEmail from "../models/ReceivedEmail";
import StudentEmailSubscriber from "../models/StudentEmailSubscriber";
import { classifyContactSubmission, classifyInboundEmail, isFakeSignupEmail } from "./spamFilter";

const CLEANUP_FLAG_ID = "cleanup_fake_emails_v2";

let started = false;

function isKnownSpamContact(contact) {
  return classifyContactSubmission(contact) === "spam";
}

function isJunkReceivedEmail(email) {
  return classifyInboundEmail(email) !== "inbox";
}

export async function deleteFakeEmails() {
  const [contacts, emails, subscribers] = await Promise.all([
    Contact.find({}).select("firstName lastName company email message").lean(),
    ReceivedEmail.find({}).select("from subject text html").lean(),
    StudentEmailSubscriber.find({}).select("email").lean(),
  ]);

  const spamContactIds = contacts.filter(isKnownSpamContact).map((doc) => doc._id);
  const junkEmailIds = emails.filter(isJunkReceivedEmail).map((doc) => doc._id);
  const spamSubscriberIds = subscribers
    .filter((doc) => isFakeSignupEmail(doc.email))
    .map((doc) => doc._id);

  const [contactResult, emailResult, subscriberResult] = await Promise.all([
    spamContactIds.length ? Contact.deleteMany({ _id: { $in: spamContactIds } }) : { deletedCount: 0 },
    junkEmailIds.length ? ReceivedEmail.deleteMany({ _id: { $in: junkEmailIds } }) : { deletedCount: 0 },
    spamSubscriberIds.length ? StudentEmailSubscriber.deleteMany({ _id: { $in: spamSubscriberIds } }) : { deletedCount: 0 },
  ]);

  return {
    contactsScanned: contacts.length,
    emailsScanned: emails.length,
    subscribersScanned: subscribers.length,
    contactsDeleted: contactResult.deletedCount || 0,
    emailsDeleted: emailResult.deletedCount || 0,
    subscribersDeleted: subscriberResult.deletedCount || 0,
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
