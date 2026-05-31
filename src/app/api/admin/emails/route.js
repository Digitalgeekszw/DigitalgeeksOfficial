import { NextResponse } from "next/server";
import { Resend } from "resend";
import connectDB from "../../../../lib/mongodb";
import ReceivedEmail from "../../../../models/ReceivedEmail";
import SentEmail from "../../../../models/SentEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_FROM_ADDRESSES = new Set([
  "contact@digitalgeeks.tech",
  "careers@digitalgeeks.tech",
]);

function normalizeRecipients(value) {
  const recipients = Array.isArray(value) ? value : String(value || "").split(",");
  return recipients.map((email) => email.trim()).filter(Boolean);
}

function getMailboxAddress(value) {
  const address = String(value || "").trim().toLowerCase();
  return ALLOWED_FROM_ADDRESSES.has(address) ? address : "contact@digitalgeeks.tech";
}

function getMailboxFromAddress(value) {
  const mailbox = getMailboxAddress(value);
  const label = mailbox.startsWith("careers@") ? "Digital Geeks Careers" : "Digital Geeks";
  return `${label} <${mailbox}>`;
}

function getSearchQuery(search, fields) {
  if (!search) return {};
  return {
    $or: fields.map((field) => ({ [field]: { $regex: search, $options: "i" } })),
  };
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") === "sent" ? "sent" : "inbox";
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const Model = folder === "sent" ? SentEmail : ReceivedEmail;
    const sortField = folder === "sent" ? "sentAt" : "receivedAt";
    const query = getSearchQuery(search, folder === "sent"
      ? ["to", "subject", "text"]
      : ["from", "subject", "text"]
    );

    const [emails, total, unreadCount, sentCount] = await Promise.all([
      Model.find(query).sort({ [sortField]: -1 }).skip(skip).limit(limit),
      Model.countDocuments(query),
      ReceivedEmail.countDocuments({ isRead: false }),
      SentEmail.countDocuments({}),
    ]);

    return NextResponse.json({ emails, total, unreadCount, sentCount, page, limit, folder }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch emails", error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { to, subject, message, fromMailbox } = await req.json();
    const recipients = normalizeRecipients(to);
    const trimmedSubject = String(subject || "").trim();
    const trimmedMessage = String(message || "").trim();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ message: "RESEND_API_KEY is not configured." }, { status: 503 });
    }

    if (recipients.length === 0 || recipients.some((email) => !EMAIL_REGEX.test(email))) {
      return NextResponse.json({ message: "A valid recipient email is required." }, { status: 400 });
    }

    if (!trimmedSubject) {
      return NextResponse.json({ message: "Subject is required." }, { status: 400 });
    }

    if (!trimmedMessage) {
      return NextResponse.json({ message: "Message is required." }, { status: 400 });
    }

    const safeReplyTo = getMailboxAddress(fromMailbox);
    const { data, error } = await resend.emails.send({
      from: getMailboxFromAddress(safeReplyTo),
      reply_to: safeReplyTo,
      to: recipients,
      subject: trimmedSubject,
      text: trimmedMessage,
    });

    if (error) {
      console.error("Admin Emails POST Resend Error:", error);
      return NextResponse.json(
        { message: "Failed to send email", error: error.message || "Resend rejected the email." },
        { status: 502 }
      );
    }

    await connectDB();
    const sentEmail = await SentEmail.create({
      from: safeReplyTo,
      to: recipients,
      subject: trimmedSubject,
      text: trimmedMessage,
      resendId: data?.id,
      sentAt: new Date(),
    });

    return NextResponse.json({ message: "Email sent successfully", id: data?.id, email: sentEmail }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails POST Error:", error);
    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, isRead } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const updated = await ReceivedEmail.findByIdAndUpdate(id, { isRead }, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Email not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email updated successfully", email: updated }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails PATCH Error:", error);
    return NextResponse.json({ message: "Failed to update email", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const folder = searchParams.get("folder") === "sent" ? "sent" : "inbox";

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const Model = folder === "sent" ? SentEmail : ReceivedEmail;
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Email not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete email", error: error.message }, { status: 500 });
  }
}
