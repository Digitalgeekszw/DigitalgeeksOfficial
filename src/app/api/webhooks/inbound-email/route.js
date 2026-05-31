import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import ReceivedEmail from "../../../../models/ReceivedEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const payload = await req.json();
    console.log("Inbound Email Webhook Payload:", JSON.stringify(payload, null, 2));

    // Resend sends 'email.received' event
    if (payload.type !== "email.received") {
      return NextResponse.json({ message: "Ignoring non-email.received event" }, { status: 200 });
    }

    const { email_id, from, to, subject } = payload.data;

    // Fetch full email content from Resend using SDK
    const { data: emailData, error: sdkError } = await resend.emails.receiving.get(email_id);

    if (sdkError) {
      console.error("Failed to fetch email content from Resend:", sdkError);
      throw new Error(`Resend SDK error: ${sdkError.message}`);
    }

    console.log("Fetched Email Data:", JSON.stringify(emailData, null, 2));

    await connectDB();

    const newEmail = await ReceivedEmail.create({
      from,
      to,
      subject,
      text: emailData.text,
      html: emailData.html,
      attachments: emailData.attachments?.map(att => ({
        name: att.name,
        content: att.content, // This might be a URL or base64 depending on Resend's response
        contentType: att.contentType,
      })) || [],
      resendId: email_id,
      receivedAt: payload.created_at,
    });

    return NextResponse.json({ message: "Email received and saved", id: newEmail._id }, { status: 201 });
  } catch (error) {
    console.error("Inbound Email Webhook Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
