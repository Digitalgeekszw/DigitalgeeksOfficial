import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Contact from "../../../../models/Contact";

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
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(query),
    ]);

    return NextResponse.json({ contacts, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Admin Contacts GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch contacts", error: error.message }, { status: 500 });
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

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Contact not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Admin Contacts DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete contact", error: error.message }, { status: 500 });
  }
}
