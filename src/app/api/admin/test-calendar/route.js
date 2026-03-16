import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const email      = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey     = process.env.GOOGLE_PRIVATE_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const meetLink   = process.env.GOOGLE_MEET_ROOM_URL;

  if (!email || !rawKey || !calendarId) {
    return NextResponse.json({ ok: false, error: 'Missing env vars' });
  }

  const credentials = { client_email: email, private_key: rawKey.replace(/\\n/g, '\n') };

  let calendarEventId = null;
  let calendarError   = null;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    const calendar = google.calendar({ version: 'v3', auth });

    const start = new Date(Date.now() + 5 * 60 * 1000);
    const end   = new Date(Date.now() + 35 * 60 * 1000);

    const res = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: meetLink ? 1 : 0,
      sendUpdates: 'none',
      resource: {
        summary: '[TEST] Calendar API Check — safe to delete',
        start: { dateTime: start.toISOString(), timeZone: 'Africa/Harare' },
        end:   { dateTime: end.toISOString(),   timeZone: 'Africa/Harare' },
        location: meetLink || undefined,
        ...(meetLink && {
          conferenceData: {
            conferenceSolution: { name: 'Google Meet', key: { type: 'hangoutsMeet' } },
            entryPoints: [{ entryPointType: 'video', uri: meetLink }],
          },
        }),
      },
    });

    calendarEventId = res.data.id;
    await calendar.events.delete({ calendarId, eventId: calendarEventId, sendUpdates: 'none' });
  } catch (e) {
    calendarError = e.message;
  }

  return NextResponse.json({
    ok: !!calendarEventId,
    calendarEventCreated: !!calendarEventId,
    meetRoomConfigured: !!meetLink,
    meetLink: meetLink || null,
    error: calendarError,
  });
}
