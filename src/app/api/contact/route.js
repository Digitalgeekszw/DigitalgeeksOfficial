import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Contact from "../../../models/Contact";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { message: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create new contact submission
    const newContact = await Contact.create({
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company || "",
      email: body.email,
      phone: body.phone || "",
      message: body.message,
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    // Provide placeholder guidance if DB is unconfigured
    if (error.message && error.message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { message: "Database is not connected. Please ask the administrator to configure MONGODB_URI." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Failed to submit inquiry", error: error.message },
      { status: 500 }
    );
  }
}
