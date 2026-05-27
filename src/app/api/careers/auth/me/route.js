import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import { getApplicantFromSession } from "../../../../../utils/applicantAuth";

export async function GET() {
  try {
    await connectDB();
    const account = await getApplicantFromSession();
    if (!account) {
      return NextResponse.json({ account: null }, { status: 401 });
    }
    return NextResponse.json({ account }, { status: 200 });
  } catch (error) {
    console.error("Applicant Me Error:", error);
    return NextResponse.json({ message: "Unable to load account.", error: error.message }, { status: 500 });
  }
}
