import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import ReceivedEmail from "../../../../models/ReceivedEmail";
import { Resend } from "resend";

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

function getMailboxFromAddress(value) {
  const address = String(value || "").trim().toLowerCase();
  const mailbox = ALLOWED_FROM_ADDRESSES.has(address) ? address : "contact@digitalgeeks.tech";
  const label = mailbox.startsWith("careers@") ? "Digital Geeks Careers" : "Digital Geeks";
  return `${label} <${mailbox}>`;
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { from: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ];
    }

    const [emails, total, unreadCount] = await Promise.all([
      ReceivedEmail.find(query).sort({ receivedAt: -1 }).skip(skip).limit(limit),
      ReceivedEmail.countDocuments(query),
      ReceivedEmail.countDocuments({ isRead: false }),
    ]);

    return NextResponse.json({ emails, total, unreadCount, page, limit }, { status: 200 });
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

    const replyTo = String(fromMailbox || "").trim().toLowerCase();
    const safeReplyTo = ALLOWED_FROM_ADDRESSES.has(replyTo) ? replyTo : "contact@digitalgeeks.tech";
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

    return NextResponse.json({ message: "Email sent successfully", id: data?.id }, { status: 200 });
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

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const deleted = await ReceivedEmail.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Email not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete email", error: error.message }, { status: 500 });
  }
}
