import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import ApplicantAccount from "../../../../../models/ApplicantAccount";
import { normalizeEmail, setApplicantSession, verifyPassword } from "../../../../../utils/applicantAuth";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");

    const account = await ApplicantAccount.findOne({ email });
    if (!account || !verifyPassword(password, account.passwordHash)) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    await setApplicantSession(account._id.toString());

    return NextResponse.json({
      account: {
        _id: account._id.toString(),
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Applicant Login Error:", error);
    return NextResponse.json({ message: "Unable to sign in.", error: error.message }, { status: 500 });
  }
}
