import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Job from "../../../models/Job";

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Public Jobs GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch jobs", error: error.message }, { status: 500 });
  }
}
