import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import JobApplication from "../../../../models/JobApplication";
import { sendApplicationStatusEmail } from "../../../../utils/email";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      JobApplication.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      JobApplication.countDocuments(query),
    ]);

    return NextResponse.json({ applications, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Admin Applicants GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch applicants", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ message: "ID and status are required." }, { status: 400 });
    }

    const validStatuses = ["Pending", "Reviewed", "Interview Scheduled", "Rejected", "Hired"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }

    const updated = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Application not found." }, { status: 404 });
    }

    // Send email notification to applicant (non-blocking)
    sendApplicationStatusEmail({
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
      jobTitle: updated.jobTitle,
      status: updated.status,
    }).catch((err) => console.error("Failed to send status email:", err));

    return NextResponse.json({ message: "Status updated successfully", application: updated }, { status: 200 });
  } catch (error) {
    console.error("Admin Applicants PATCH Error:", error);
    return NextResponse.json({ message: "Failed to update status", error: error.message }, { status: 500 });
  }
}
