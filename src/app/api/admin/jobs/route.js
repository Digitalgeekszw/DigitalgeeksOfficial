import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Job from "../../../../models/Job";

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Admin Jobs GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch jobs", error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const newJob = await Job.create(body);
    return NextResponse.json({ message: "Job created successfully", job: newJob }, { status: 201 });
  } catch (error) {
    console.error("Admin Jobs POST Error:", error);
    return NextResponse.json({ message: "Failed to create job", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully", job: updatedJob }, { status: 200 });
  } catch (error) {
    console.error("Admin Jobs PATCH Error:", error);
    return NextResponse.json({ message: "Failed to update job", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Admin Jobs DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete job", error: error.message }, { status: 500 });
  }
}
