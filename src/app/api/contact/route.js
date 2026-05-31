import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Contact from "../../../models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email notification to the team
    try {
      await resend.emails.send({
        from: "Digital Geeks Contact Form <contact@digitalgeeks.tech>",
        to: "contact@digitalgeeks.tech",
        subject: `New Inquiry from ${body.firstName} ${body.lastName}`,
        text: `New contact inquiry:
        
        Name: ${body.firstName} ${body.lastName}
        Email: ${body.email}
        Company: ${body.company || "N/A"}
        Phone: ${body.phone || "N/A"}
        Message: ${body.message}`,
        html: `
        <h1>New Contact Inquiry</h1>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Company:</strong> ${body.company || "N/A"}</p>
        <p><strong>Phone:</strong> ${body.phone || "N/A"}</p>
        <p><strong>Message:</strong> ${body.message}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
      // We don't fail the request if just the email fails, but we log it.
    }

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
