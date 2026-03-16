import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import InterviewSlot from '../../../../models/InterviewSlot';
import { createInterviewEvent } from '../../../../utils/googleCalendar';
import { sendInterviewConfirmationEmail } from '../../../../utils/email';

// GET available slots for a scheduling token
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Token is required.' }, { status: 400 });
    }

    const application = await JobApplication.findOne({ scheduleToken: token });
    if (!application) {
      return NextResponse.json({ message: 'Invalid or expired scheduling link.' }, { status: 404 });
    }

    if (application.interviewSlot) {
      return NextResponse.json({ message: 'Already booked', alreadyBooked: true, application }, { status: 200 });
    }

    // Return future available (unbooked) slots
    const slots = await InterviewSlot.find({
      isBooked: false,
      startTime: { $gt: new Date() },
    }).sort({ startTime: 1 });

    return NextResponse.json({ slots, application: { firstName: application.firstName, jobTitle: application.jobTitle } }, { status: 200 });
  } catch (error) {
    console.error('Interview Book GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch slots', error: error.message }, { status: 500 });
  }
}

// POST book a slot
export async function POST(req) {
  try {
    await connectDB();
    const { token, slotId } = await req.json();

    if (!token || !slotId) {
      return NextResponse.json({ message: 'Token and slotId are required.' }, { status: 400 });
    }

    const application = await JobApplication.findOne({ scheduleToken: token });
    if (!application) {
      return NextResponse.json({ message: 'Invalid or expired scheduling link.' }, { status: 404 });
    }

    if (application.interviewSlot) {
      return NextResponse.json({ message: 'You have already booked an interview slot.' }, { status: 409 });
    }

    const slot = await InterviewSlot.findById(slotId);
    if (!slot || slot.isBooked) {
      return NextResponse.json({ message: 'This slot is no longer available.' }, { status: 409 });
    }

    // Create Google Calendar event with Meet link
    let googleEventId = null;
    let meetLink = null;
    try {
      const result = await createInterviewEvent({
        startTime: slot.startTime,
        endTime: slot.endTime,
        applicantName: `${application.firstName} ${application.lastName}`,
        applicantEmail: application.email,
        jobTitle: application.jobTitle,
      });
      googleEventId = result.googleEventId;
      meetLink = result.meetLink;
    } catch (gcErr) {
      console.error('Failed to create Google Calendar event:', gcErr.message);
    }

    // Mark slot as booked
    slot.isBooked = true;
    slot.bookedBy = application._id;
    slot.googleEventId = googleEventId;
    slot.meetLink = meetLink;
    await slot.save();

    // Update application
    application.status = 'Interview Scheduled';
    application.interviewSlot = slot._id;
    await application.save();

    // Send confirmation email
    try {
      await sendInterviewConfirmationEmail({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        jobTitle: application.jobTitle,
        startTime: slot.startTime,
        meetLink,
      });
    } catch (emailErr) {
      console.error('Failed to send confirmation email:', emailErr.message);
    }

    return NextResponse.json({
      message: 'Interview booked successfully',
      meetLink,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }, { status: 200 });
  } catch (error) {
    console.error('Interview Book POST Error:', error);
    return NextResponse.json({ message: 'Failed to book slot', error: error.message }, { status: 500 });
  }
}
