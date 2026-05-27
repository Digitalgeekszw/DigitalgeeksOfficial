import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import Job from "../../../../../models/Job";
import { notifyOpportunitySubscribers } from "../../../../../utils/opportunityNotifications";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { jobId, message } = body;

    if (!jobId) {
      return NextResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const job = await Job.findById(jobId).lean();
    if (!job) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    const result = await notifyOpportunitySubscribers(job, message || "");
    return NextResponse.json({ message: "Opportunity email sent.", ...result }, { status: 200 });
  } catch (error) {
    console.error("Admin Student Emails Notify Error:", error);
    return NextResponse.json({ message: "Unable to send opportunity email.", error: error.message }, { status: 500 });
  }
}
