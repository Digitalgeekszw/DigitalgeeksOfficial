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

  const insertResponse = await calendar.events.insert({
    calendarId,
    resource: event,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });

  let createdEvent = insertResponse.data;

  // Meet link is sometimes not in the insert response — fetch the event again to get it
  if (!createdEvent.conferenceData?.entryPoints && !createdEvent.hangoutLink) {
    try {
      const getResponse = await calendar.events.get({
        calendarId,
        eventId: createdEvent.id,
        conferenceDataVersion: 1,
      });
      createdEvent = getResponse.data;
    } catch (e) {
      console.error('Failed to re-fetch event for Meet link:', e.message);
    }
  }

  const meetLink =
    createdEvent.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri ||
    createdEvent.hangoutLink ||
    null;

  console.log('Google Calendar event created:', createdEvent.id, '| Meet link:', meetLink);

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
