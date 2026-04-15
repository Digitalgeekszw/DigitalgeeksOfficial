import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import ZimsenseiApplication from "../../../models/ZimsenseiApplication";

export async function POST(req) {
  try {
    const body = await req.json();

    const required = ["name", "email", "phone", "school", "qualifications", "examBoard", "results"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    await connectDB();

    // Check for duplicate email
    const existing = await ZimsenseiApplication.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json(
        { message: "An application with this email already exists." },
        { status: 409 }
      );
    }

    const application = await ZimsenseiApplication.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      school: body.school,
      qualifications: body.qualifications,
      examBoard: body.examBoard,
      results: body.results,
    });

    return NextResponse.json(
      { message: "Application submitted successfully!", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("ZimSensei Pilot API Error:", error);

    if (error.message && error.message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { message: "Database is not connected. Please ask the administrator to configure MONGODB_URI." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Failed to submit application", error: error.message },
      { status: 500 }
    );
  }
}
