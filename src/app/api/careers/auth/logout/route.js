import { NextResponse } from "next/server";
import { clearApplicantSession } from "../../../../../utils/applicantAuth";

export async function POST() {
  await clearApplicantSession();
  return NextResponse.json({ message: "Signed out" }, { status: 200 });
}
