import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import ReceivedEmail from "../../../../models/ReceivedEmail";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { from: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ];
    }

    const [emails, total, unreadCount] = await Promise.all([
      ReceivedEmail.find(query).sort({ receivedAt: -1 }).skip(skip).limit(limit),
      ReceivedEmail.countDocuments(query),
      ReceivedEmail.countDocuments({ isRead: false }),
    ]);

    return NextResponse.json({ emails, total, unreadCount, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch emails", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, isRead } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const updated = await ReceivedEmail.findByIdAndUpdate(id, { isRead }, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Email not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email updated successfully", email: updated }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails PATCH Error:", error);
    return NextResponse.json({ message: "Failed to update email", error: error.message }, { status: 500 });
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

    const deleted = await ReceivedEmail.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Email not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Admin Emails DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete email", error: error.message }, { status: 500 });
  }
}
