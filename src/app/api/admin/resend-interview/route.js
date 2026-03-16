import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import InterviewSlot from '../../../../models/InterviewSlot';
import { sendInterviewConfirmationEmail } from '../../../../utils/email';

export async function POST(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Application ID is required.' }, { status: 400 });
    }

    const application = await JobApplication.findById(id).populate('interviewSlot');
    if (!application) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    if (application.status !== 'Interview Scheduled') {
      return NextResponse.json({ message: 'No scheduled interview for this applicant.' }, { status: 400 });
    }

    if (!application.interviewSlot) {
      return NextResponse.json({ message: 'No interview slot found for this applicant.' }, { status: 404 });
    }

    const slot = application.interviewSlot;
    const meetLink = slot.meetLink || process.env.GOOGLE_MEET_ROOM_URL || null;

    await sendInterviewConfirmationEmail({
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      jobTitle: application.jobTitle,
      startTime: slot.startTime,
      meetLink,
    });

    return NextResponse.json({ message: 'Confirmation email resent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Resend Interview Email Error:', error);
    return NextResponse.json({ message: 'Failed to resend email.', error: error.message }, { status: 500 });
  }
}
