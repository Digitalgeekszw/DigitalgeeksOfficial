import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import JobApplication from "../../../../models/JobApplication";
import { uploadToR2 } from "../../../../utils/r2";

export async function POST(req) {
  try {
    // Connect to database first to ensure DB is up
    try {
      await connectDB();
    } catch (dbError) {
      console.error("Database Connection Error in Career API:", dbError);
      return NextResponse.json(
        { message: "Database connection failed. Please try again later.", error: dbError.message },
        { status: 503 }
      );
    }

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
        { message: "All required fields (First name, last name, email, phone, job title, and CV) must be provided." },
        { status: 400 }
      );
    }

    // Verify cvFile is actually a file
    if (!(cvFile instanceof Blob)) {
      console.error("Uploaded CV is not a valid file object:", typeof cvFile);
      return NextResponse.json(
        { message: "Invalid file upload. Please select a valid PDF resume." },
        { status: 400 }
      );
    }

    console.log(`Received file: ${cvFile.name}, size: ${cvFile.size} bytes, type: ${cvFile.type}`);

    // Process file upload
    let resumeUrl = "";
    try {
      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload to R2 and get public URL
      resumeUrl = await uploadToR2(buffer, cvFile.name, cvFile.type);
    } catch (r2Error) {
      console.error("R2 Upload Error in Career API:", r2Error);
      return NextResponse.json(
        { message: "Failed to upload resume. Please check your connection and try again.", error: r2Error.message },
        { status: 500 }
      );
    }

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

    console.log(`New application submitted: ${firstName} ${lastName} for ${jobTitle}`);

    return NextResponse.json(
      { message: "Application submitted successfully", application: newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.error("Career Application API General Error:", error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later.", error: error.message },
      { status: 500 }
    );
  }
}
