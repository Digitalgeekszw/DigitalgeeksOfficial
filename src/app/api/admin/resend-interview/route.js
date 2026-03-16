import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import InterviewSlot from '../../../../models/InterviewSlot';
import { createInterviewEvent } from '../../../../utils/googleCalendar';

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

    const slot = await InterviewSlot.findById(application.interviewSlot._id);
    let meetLink = slot.meetLink || process.env.GOOGLE_MEET_ROOM_URL || null;

    if (slot.googleEventId) {
      return NextResponse.json({ message: 'Calendar event already exists.' }, { status: 200 });
    }

    // Create the calendar event without emailing the candidate
    const result = await createInterviewEvent({
      startTime: slot.startTime,
      endTime: slot.endTime,
      applicantName: `${application.firstName} ${application.lastName}`,
      applicantEmail: application.email,
      jobTitle: application.jobTitle,
    });

    slot.googleEventId = result.googleEventId;
    slot.meetLink = result.meetLink || meetLink;
    await slot.save();

    return NextResponse.json({ message: 'Added to your Google Calendar.' }, { status: 200 });
  } catch (error) {
    console.error('Resend Interview Email Error:', error);
    return NextResponse.json({ message: 'Failed to resend.', error: error.message }, { status: 500 });
  }
}
