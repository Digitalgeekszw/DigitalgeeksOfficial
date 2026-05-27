import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import ApplicantAccount from "../../../../../models/ApplicantAccount";
import StudentEmailSubscriber from "../../../../../models/StudentEmailSubscriber";
import { hashPassword, normalizeEmail, setApplicantSession } from "../../../../../utils/applicantAuth";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");

    if (!firstName || !lastName || !email || password.length < 8) {
      return NextResponse.json({ message: "First name, last name, valid email, and an 8+ character password are required." }, { status: 400 });
    }

    const existing = await ApplicantAccount.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "An applicant account already exists for this email." }, { status: 409 });
    }

    const account = await ApplicantAccount.create({
      firstName,
      lastName,
      email,
      passwordHash: hashPassword(password),
    });

    await StudentEmailSubscriber.findOneAndUpdate(
      { email },
      { $set: { accountCreatedAt: new Date() }, $setOnInsert: { email, source: "signup", subscribed: true } },
      { upsert: true, new: true }
    );

    await setApplicantSession(account._id.toString());

    return NextResponse.json({
      account: {
        _id: account._id.toString(),
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Applicant Register Error:", error);
    return NextResponse.json({ message: "Unable to create applicant account.", error: error.message }, { status: 500 });
  }
}
