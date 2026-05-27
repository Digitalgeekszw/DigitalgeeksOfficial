import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import StudentEmailSubscriber from "../../../../models/StudentEmailSubscriber";
import ApplicantAccount from "../../../../models/ApplicantAccount";
import { normalizeEmail } from "../../../../utils/applicantAuth";

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

function extractEmails(text) {
  return Array.from(new Set(String(text || "").match(EMAIL_REGEX)?.map(normalizeEmail) || []));
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const query = search
      ? { email: { $regex: search, $options: "i" } }
      : {};

    const [subscribers, total, subscribed, accounts] = await Promise.all([
      StudentEmailSubscriber.find(query).sort({ createdAt: -1 }).limit(100).lean(),
      StudentEmailSubscriber.countDocuments(query),
      StudentEmailSubscriber.countDocuments({ subscribed: true }),
      ApplicantAccount.countDocuments(),
    ]);

    return NextResponse.json({
      subscribers: subscribers.map((subscriber) => ({
        ...subscriber,
        _id: subscriber._id.toString(),
        hasAccount: Boolean(subscriber.accountCreatedAt),
      })),
      total,
      subscribed,
      accounts,
    }, { status: 200 });
  } catch (error) {
    console.error("Admin Student Emails GET Error:", error);
    return NextResponse.json({ message: "Unable to load student emails.", error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const contentType = req.headers.get("content-type") || "";
    let emails = [];
    let source = "manual";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");
      const text = formData.get("emails");
      source = String(formData.get("source") || "csv");
      if (file instanceof Blob) {
        emails = extractEmails(await file.text());
      } else {
        emails = extractEmails(text);
      }
    } else {
      const body = await req.json();
      source = body.source || "manual";
      emails = extractEmails(Array.isArray(body.emails) ? body.emails.join("\n") : body.email || body.emails);
    }

    if (emails.length === 0) {
      return NextResponse.json({ message: "No valid emails found to import." }, { status: 400 });
    }

    const existingAccounts = await ApplicantAccount.find({ email: { $in: emails } }).select("email createdAt").lean();
    const accountMap = new Map(existingAccounts.map((account) => [account.email, account.createdAt]));

    const results = await Promise.allSettled(emails.map((email) => StudentEmailSubscriber.updateOne(
      { email },
      {
        $set: {
          subscribed: true,
          ...(accountMap.has(email) ? { accountCreatedAt: accountMap.get(email) } : {}),
        },
        $setOnInsert: { email, source },
      },
      { upsert: true }
    )));

    const failed = results.filter((result) => result.status === "rejected").length;

    return NextResponse.json({
      message: "Student email list imported.",
      imported: emails.length - failed,
      failed,
    }, { status: 200 });
  } catch (error) {
    console.error("Admin Student Emails POST Error:", error);
    return NextResponse.json({ message: "Unable to import student emails.", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const id = body.id;
    if (!id) {
      return NextResponse.json({ message: "Subscriber ID is required." }, { status: 400 });
    }

    const subscriber = await StudentEmailSubscriber.findByIdAndUpdate(
      id,
      { subscribed: Boolean(body.subscribed) },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json({ message: "Subscriber not found." }, { status: 404 });
    }

    return NextResponse.json({ subscriber }, { status: 200 });
  } catch (error) {
    console.error("Admin Student Emails PATCH Error:", error);
    return NextResponse.json({ message: "Unable to update subscriber.", error: error.message }, { status: 500 });
  }
}
