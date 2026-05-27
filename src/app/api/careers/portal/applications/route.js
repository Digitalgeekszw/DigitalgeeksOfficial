import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import JobApplication from "../../../../../models/JobApplication";
import { getApplicantFromSession } from "../../../../../utils/applicantAuth";

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET() {
  try {
    await connectDB();
    const account = await getApplicantFromSession();
    if (!account) {
      return NextResponse.json({ message: "Applicant sign in required." }, { status: 401 });
    }

    const applications = await JobApplication.find({
      email: { $regex: `^${escapeRegex(account.email)}$`, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      applications: applications.map((application) => ({
        ...application,
        _id: application._id.toString(),
        createdAt: application.createdAt?.toISOString?.() || application.createdAt,
        updatedAt: application.updatedAt?.toISOString?.() || application.updatedAt,
      })),
    }, { status: 200 });
  } catch (error) {
    console.error("Applicant Portal Applications Error:", error);
    return NextResponse.json({ message: "Unable to load applications.", error: error.message }, { status: 500 });
  }
}
