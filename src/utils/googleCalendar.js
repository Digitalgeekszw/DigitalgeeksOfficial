import { google } from 'googleapis';

function getCalendarClient() {
  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });

  return google.calendar({ version: 'v3', auth });
}

/**
 * Creates a Google Calendar event with a Google Meet link.
 * @param {{ startTime: Date, endTime: Date, applicantName: string, applicantEmail: string, jobTitle: string }} params
 * @returns {{ googleEventId: string, meetLink: string }}
 */
export async function createInterviewEvent({ startTime, endTime, applicantName, applicantEmail, jobTitle }) {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  const event = {
    summary: `Interview – ${applicantName} for ${jobTitle}`,
    description: `Interview with ${applicantName} for the ${jobTitle} position at Digital Geeks.`,
    start: { dateTime: startTime.toISOString(), timeZone: 'Africa/Harare' },
    end:   { dateTime: endTime.toISOString(),   timeZone: 'Africa/Harare' },
    attendees: [
      { email: applicantEmail, displayName: applicantName },
    ],
    conferenceData: {
      createRequest: {
        requestId: `dg-interview-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 15 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    resource: event,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });

  const createdEvent = response.data;
  const meetLink = createdEvent.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri || null;

  return {
    googleEventId: createdEvent.id,
    meetLink,
  };
}

/**
 * Deletes a Google Calendar event by event ID.
 */
export async function deleteInterviewEvent(googleEventId) {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  await calendar.events.delete({ calendarId, eventId: googleEventId, sendUpdates: 'all' });
}
