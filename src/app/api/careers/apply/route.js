import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import JobApplication from "../../../../models/JobApplication";
import { uploadToR2 } from "../../../../utils/r2";

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Extract text fields
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const jobTitle = formData.get("jobTitle");
    const coverLetter = formData.get("coverLetter") || "";

    // Extract file
    const cvFile = formData.get("cv");

    if (!firstName || !lastName || !email || !phone || !jobTitle || !cvFile) {
      return NextResponse.json(
        { message: "First name, last name, email, phone, job title, and CV are required." },
        { status: 400 }
      );
    }

    // Process file upload directly since formData.get('cv') returns a File object in next/server
    // Convert File to Buffer
    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2 and get public URL
    const resumeUrl = await uploadToR2(buffer, cvFile.name, cvFile.type);

    // Connect to database
    await connectDB();

    // Create new application record
    const newApplication = await JobApplication.create({
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      resumeUrl,
      coverLetter,
      status: "Pending"
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application: newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.error("Career Application API Error:", error);

    // Specific error mapping
    if (error.message && error.message.includes("R2")) {
      return NextResponse.json(
        { message: "Cloud storage configuration error. Please contact administrator.", error: error.message },
        { status: 503 }
      );
    }

    if (error.message && error.message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { message: "Database is not connected. Please contact administrator.", error: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Failed to submit application", error: error.message },
      { status: 500 }
    );
  }
}
