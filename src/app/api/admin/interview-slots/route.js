import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import InterviewSlot from '../../../../models/InterviewSlot';
import { deleteInterviewEvent } from '../../../../utils/googleCalendar';

// GET all slots (admin)
export async function GET() {
  try {
    await connectDB();
    const slots = await InterviewSlot.find()
      .populate('bookedBy', 'firstName lastName email jobTitle')
      .sort({ startTime: 1 });
    return NextResponse.json({ slots }, { status: 200 });
  } catch (error) {
    console.error('Interview Slots GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch slots', error: error.message }, { status: 500 });
  }
}

const SLOT_DURATION_MS = 30 * 60 * 1000; // 30 minutes

// POST — split the dragged time range into 30-min slots
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { startTime, endTime } = body;

    if (!startTime || !endTime) {
      return NextResponse.json({ message: 'startTime and endTime are required.' }, { status: 400 });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start) || isNaN(end) || end <= start) {
      return NextResponse.json({ message: 'Invalid time range.' }, { status: 400 });
    }

    const totalMs = end - start;
    if (totalMs < SLOT_DURATION_MS) {
      return NextResponse.json({ message: 'Minimum availability window is 30 minutes.' }, { status: 400 });
    }

    // Build 30-min chunks
    const toCreate = [];
    let cursor = new Date(start);
    while (cursor.getTime() + SLOT_DURATION_MS <= end.getTime()) {
      const slotEnd = new Date(cursor.getTime() + SLOT_DURATION_MS);
      toCreate.push({ startTime: new Date(cursor), endTime: slotEnd });
      cursor = slotEnd;
    }

    const slots = await InterviewSlot.insertMany(toCreate);
    return NextResponse.json({ message: `${slots.length} slot(s) created`, slots }, { status: 201 });
  } catch (error) {
    console.error('Interview Slots POST Error:', error);
    return NextResponse.json({ message: 'Failed to create slots', error: error.message }, { status: 500 });
  }
}

// DELETE a slot
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Slot ID is required.' }, { status: 400 });
    }

    const slot = await InterviewSlot.findById(id);
    if (!slot) {
      return NextResponse.json({ message: 'Slot not found.' }, { status: 404 });
    }

    // Remove Google Calendar event if it exists
    if (slot.googleEventId) {
      try {
        await deleteInterviewEvent(slot.googleEventId);
      } catch (gcErr) {
        console.error('Failed to delete Google Calendar event:', gcErr.message);
      }
    }

    await slot.deleteOne();
    return NextResponse.json({ message: 'Slot deleted' }, { status: 200 });
  } catch (error) {
    console.error('Interview Slots DELETE Error:', error);
    return NextResponse.json({ message: 'Failed to delete slot', error: error.message }, { status: 500 });
  }
}
