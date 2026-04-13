import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import { uploadToR2 } from '../../../../utils/r2';
import { sendOfferLetterEmail } from '../../../../utils/email';

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get('id');
    const file = formData.get('file');

    if (!id || !file) {
      return NextResponse.json({ message: 'id and file are required.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ message: 'Only PDF files are accepted.' }, { status: 400 });
    }

    const application = await JobApplication.findById(id);
    if (!application) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileUrl = await uploadToR2(buffer, file.name, file.type, 'offer-letters');

    application.offerLetter = {
      sentAt: new Date(),
      fileUrl,
      fileName: file.name,
    };

    await application.save();

    try {
      await sendOfferLetterEmail({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        jobTitle: application.jobTitle,
        fileBuffer: buffer,
        fileName: file.name,
      });
    } catch (emailError) {
      console.error('Failed to send offer letter email:', emailError.message);
      return NextResponse.json(
        { message: 'Offer letter saved, but failed to send email.', error: emailError.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Offer letter sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Admin Send Offer Letter Error:', error);
    return NextResponse.json(
      { message: 'Failed to send offer letter.', error: error.message },
      { status: 500 }
    );
  }
}
