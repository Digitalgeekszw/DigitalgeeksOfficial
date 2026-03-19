import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import InterviewSlot from '../../../../models/InterviewSlot';
import { sendRescheduleInviteEmail } from '../../../../utils/email';

export async function POST(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Application ID is required.' }, { status: 400 });
    }

    const application = await JobApplication.findById(id);
    if (!application) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    // Free up the old slot so it becomes available again
    if (application.interviewSlot) {
      await InterviewSlot.findByIdAndUpdate(application.interviewSlot, {
        isBooked: false,
        bookedBy: null,
        googleEventId: null,
        meetLink: null,
      });
    }

    // Generate a fresh schedule token and reset booking state
    const newToken = randomUUID();
    application.scheduleToken = newToken;
    application.interviewSlot = null;
    application.status = 'Interview Scheduled'; // stays scheduled, just needs new slot
    await application.save();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://digitalgeeks.tech';
    const schedulingLink = `${appUrl}/interview/${newToken}?reschedule=true`;

    await sendRescheduleInviteEmail({
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      jobTitle: application.jobTitle,
      schedulingLink,
    });

    return NextResponse.json({ message: 'Reschedule link sent.' }, { status: 200 });
  } catch (error) {
    console.error('Reschedule Invite Error:', error);
    return NextResponse.json({ message: 'Failed to send reschedule link.', error: error.message }, { status: 500 });
  }
}
