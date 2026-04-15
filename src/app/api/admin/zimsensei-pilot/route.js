import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import ZimsenseiApplication from "../../../../models/ZimsenseiApplication";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const examBoard = searchParams.get("examBoard");

    const query = {};
    if (status && status !== "all") query.status = status;
    if (examBoard && examBoard !== "all") query.examBoard = examBoard;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { school: { $regex: search, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      ZimsenseiApplication.find(query).sort({ createdAt: -1 }),
      ZimsenseiApplication.countDocuments(query),
    ]);

    return NextResponse.json({ applications, total }, { status: 200 });
  } catch (error) {
    console.error("Admin ZimSensei GET Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const updateData = {};
    if (status) {
      const validStatuses = ["Pending", "Reviewed", "Selected", "Waitlisted", "Rejected"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
      }
      updateData.status = status;
    }
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    const updated = await ZimsenseiApplication.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Application not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Application updated successfully", application: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin ZimSensei PATCH Error:", error);
    return NextResponse.json(
      { message: "Failed to update application", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const deleted = await ZimsenseiApplication.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Application deleted." }, { status: 200 });
  } catch (error) {
    console.error("Admin ZimSensei DELETE Error:", error);
    return NextResponse.json(
      { message: "Failed to delete application", error: error.message },
      { status: 500 }
    );
  }
}
