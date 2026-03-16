import { google } from 'googleapis';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });
}

/**
 * Creates a Google Calendar event with a Google Meet link.
 */
export async function createInterviewEvent({ startTime, endTime, applicantName, applicantEmail, jobTitle }) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const meetLink = process.env.GOOGLE_MEET_ROOM_URL || null;

  const calendar = google.calendar({ version: 'v3', auth: getAuth() });

  const event = {
    summary: `Interview – ${applicantName} for ${jobTitle}`,
    description: [
      `Interview with ${applicantName} for the ${jobTitle} position at Digital Geeks.`,
      meetLink ? `\nJoin Google Meet: ${meetLink}` : '',
    ].join(''),
    start: { dateTime: new Date(startTime).toISOString(), timeZone: 'Africa/Harare' },
    end:   { dateTime: new Date(endTime).toISOString(),   timeZone: 'Africa/Harare' },
    location: meetLink || undefined,
    attendees: [
      { email: applicantEmail, displayName: applicantName },
    ],
    ...(meetLink && {
      conferenceData: {
        conferenceSolution: {
          name: 'Google Meet',
          key: { type: 'hangoutsMeet' },
          iconUri: 'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png',
        },
        entryPoints: [{
          entryPointType: 'video',
          uri: meetLink,
          label: meetLink.replace('https://', ''),
        }],
      },
    }),
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 15 },
      ],
    },
  };

  const res = await calendar.events.insert({
    calendarId,
    resource: event,
    conferenceDataVersion: meetLink ? 1 : 0,
    sendUpdates: 'all',
  });

  console.log('Calendar event created:', res.data.id, '| Meet link:', meetLink);

  return { googleEventId: res.data.id, meetLink };
}

/**
 * Deletes a Google Calendar event by event ID.
 */
export async function deleteInterviewEvent(googleEventId) {
  const calendar = google.calendar({ version: 'v3', auth: getAuth() });
  await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId: googleEventId,
    sendUpdates: 'all',
  });
}
