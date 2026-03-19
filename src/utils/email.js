import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const STATUS_MESSAGES = {
  Reviewed: {
    subject: "Application Received: Next Steps – Digital Geeks",
    heading: "Application Under Review",
    body: "We have completed an initial review of your application and are giving it serious consideration. Our team will be in touch with further updates as we move through our selection process.",
  },
  "Interview Scheduled": {
    subject: "Interview Request – Digital Geeks",
    heading: "We Would Like to Interview You",
    body: "We were impressed by your application and would like to invite you to an interview. A member of our team will reach out to you shortly with the interview details, including the date, time, and format.",
  },
  Rejected: {
    subject: "Your Application Status – Digital Geeks",
    heading: "Application Decision",
    body: "Thank you for your interest in joining Digital Geeks and for the time you invested in your application. After careful consideration, we have decided not to move forward with your application at this time. We encourage you to apply for future openings that match your skills and experience.",
  },
  Hired: {
    subject: "Application Decision – Digital Geeks",
    heading: "Welcome to the Digital Geeks Team",
    body: "We are pleased to inform you that you have been selected for the position. Our team will be in touch very shortly with details regarding your onboarding, start date, and next steps. We look forward to having you on board.",
  },
};

function buildPlainText({ fullName, jobTitle, body }) {
  return [
    `Dear ${fullName},`,
    ``,
    body,
    ``,
    `Position Applied For: ${jobTitle}`,
    ``,
    `If you have any questions, feel free to reply to this email or contact us at careers@digitalgeeks.tech.`,
    ``,
    `--`,
    `Digital Geeks — Technology & Innovation`,
    `© ${new Date().getFullYear()} Digital Geeks. All rights reserved.`,
    `This email was sent regarding your job application.`,
  ].join("\n");
}

export async function sendScheduleInterviewEmail({ firstName, lastName, email, jobTitle, schedulingLink }) {
  const fullName = `${firstName} ${lastName}`;
  const subject = "Schedule Your Interview – Digital Geeks";

  const text = [
    `Dear ${fullName},`,
    ``,
    `We were impressed by your application for the ${jobTitle} position and would like to invite you to a short interview with our team.`,
    ``,
    `Please use the link below to select a time slot that works best for you:`,
    `${schedulingLink}`,
    ``,
    `Once you book a slot, you will receive a Google Meet link to join the interview.`,
    ``,
    `If you have any questions, feel free to reply to this email or contact us at careers@digitalgeeks.tech.`,
    ``,
    `--`,
    `Digital Geeks — Technology & Innovation`,
    `© ${new Date().getFullYear()} Digital Geeks. All rights reserved.`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Digital Geeks</h1>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">Technology &amp; Innovation</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">You're Invited to Interview!</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Dear ${fullName},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">We were impressed by your application for the <strong>${jobTitle}</strong> position and would like to invite you to a short interview with our team.</p>
              <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Please click the button below to choose a time slot that works best for you. Once booked, you will receive a <strong>Google Meet link</strong> to join the interview.</p>
              <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:8px;background-color:#4f46e5;">
                    <a href="${schedulingLink}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;">
                      Choose Your Interview Slot
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;">Or copy this link into your browser:</p>
              <p style="margin:0 0 20px;word-break:break-all;"><a href="${schedulingLink}" style="color:#3b82f6;font-size:13px;text-decoration:none;">${schedulingLink}</a></p>
              <table cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Position Applied For</p>
                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${jobTitle}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} Digital Geeks. All rights reserved.</p>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">This email was sent regarding your job application.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: "Digital Geeks Careers <careers@digitalgeeks.tech>",
    reply_to: "careers@digitalgeeks.tech",
    to: email,
    subject,
    text,
    html,
  });
}

export async function sendRescheduleInviteEmail({ firstName, lastName, email, jobTitle, schedulingLink }) {
  const fullName = `${firstName} ${lastName}`;
  const subject = "Reschedule Your Interview – Digital Geeks";

  const text = [
    `Dear ${fullName},`,
    ``,
    `We need to reschedule your upcoming interview for the ${jobTitle} position.`,
    ``,
    `Please use the link below to select a new time slot that works best for you:`,
    `${schedulingLink}`,
    ``,
    `Once you book a new slot, you will receive a confirmation email with your Google Meet link.`,
    ``,
    `If you have any questions, feel free to reply to this email or contact us at careers@digitalgeeks.tech.`,
    ``,
    `--`,
    `Digital Geeks — Technology & Innovation`,
    `© ${new Date().getFullYear()} Digital Geeks. All rights reserved.`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Digital Geeks</h1>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">Technology &amp; Innovation</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Interview Reschedule Request</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Dear ${fullName},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">We need to reschedule your upcoming interview for the <strong>${jobTitle}</strong> position. We apologise for any inconvenience caused.</p>
              <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Please click the button below to select a new time slot. Once booked, you will receive a <strong>Google Meet link</strong> to join the interview.</p>
              <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:8px;background-color:#f59e0b;">
                    <a href="${schedulingLink}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;">
                      Choose a New Interview Slot
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;">Or copy this link into your browser:</p>
              <p style="margin:0 0 20px;word-break:break-all;"><a href="${schedulingLink}" style="color:#3b82f6;font-size:13px;text-decoration:none;">${schedulingLink}</a></p>
              <table cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Position Applied For</p>
                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${jobTitle}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} Digital Geeks. All rights reserved.</p>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">This email was sent regarding your job application.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: "Digital Geeks Careers <careers@digitalgeeks.tech>",
    reply_to: "careers@digitalgeeks.tech",
    to: email,
    subject,
    text,
    html,
  });
}

export async function sendInterviewConfirmationEmail({ firstName, lastName, email, jobTitle, startTime, meetLink }) {
  const fullName = `${firstName} ${lastName}`;
  const subject = "Interview Confirmed – Digital Geeks";

  const dateStr = new Date(startTime).toLocaleString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Africa/Harare",
  });

  const meetSection = meetLink
    ? `Your Google Meet link: ${meetLink}`
    : "Our team will send you a meeting link shortly.";

  const text = [
    `Dear ${fullName},`,
    ``,
    `Your interview has been confirmed! Here are the details:`,
    ``,
    `Position: ${jobTitle}`,
    `Date & Time: ${dateStr} (CAT)`,
    ``,
    meetSection,
    ``,
    `Please join a few minutes early. If you need to reschedule, contact us at careers@digitalgeeks.tech.`,
    ``,
    `--`,
    `Digital Geeks — Technology & Innovation`,
    `© ${new Date().getFullYear()} Digital Geeks. All rights reserved.`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Digital Geeks</h1>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">Technology &amp; Innovation</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Interview Confirmed!</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Dear ${fullName},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Your interview has been successfully scheduled. We look forward to speaking with you!</p>
              <table cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Interview Details</p>
                    <p style="margin:0 0 6px;color:#64748b;font-size:13px;">Position</p>
                    <p style="margin:0 0 16px;color:#0f172a;font-size:15px;font-weight:600;">${jobTitle}</p>
                    <p style="margin:0 0 6px;color:#64748b;font-size:13px;">Date &amp; Time (CAT)</p>
                    <p style="margin:0 0 16px;color:#0f172a;font-size:15px;font-weight:600;">${dateStr}</p>
                    ${meetLink ? `
                    <p style="margin:0 0 6px;color:#64748b;font-size:13px;">Google Meet Link</p>
                    <p style="margin:0;"><a href="${meetLink}" style="color:#3b82f6;font-size:15px;font-weight:600;word-break:break-all;">${meetLink}</a></p>
                    ` : `<p style="margin:0;color:#374151;font-size:14px;">A meeting link will be sent to you shortly.</p>`}
                  </td>
                </tr>
              </table>
              ${meetLink ? `
              <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:8px;background-color:#059669;">
                    <a href="${meetLink}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;">
                      Join Google Meet
                    </a>
                  </td>
                </tr>
              </table>
              ` : ""}
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">Please join a few minutes early. If you need to reschedule, contact us at <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} Digital Geeks. All rights reserved.</p>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">This email was sent regarding your job application.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: "Digital Geeks Careers <careers@digitalgeeks.tech>",
    reply_to: "careers@digitalgeeks.tech",
    to: email,
    subject,
    text,
    html,
  });
}

export async function sendApplicationStatusEmail({ firstName, lastName, email, jobTitle, status }) {
  const template = STATUS_MESSAGES[status];
  if (!template) return;

  const fullName = `${firstName} ${lastName}`;
  const text = buildPlainText({ fullName, jobTitle, body: template.body });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${template.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Digital Geeks</h1>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">Technology &amp; Innovation</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">${template.heading}</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Dear ${fullName},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">${template.body}</p>
              <table cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Position Applied For</p>
                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${jobTitle}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} Digital Geeks. All rights reserved.</p>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">This email was sent regarding your job application.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: "Digital Geeks Careers <careers@digitalgeeks.tech>",
    reply_to: "careers@digitalgeeks.tech",
    to: email,
    subject: template.subject,
    text,
    html,
  });
}
