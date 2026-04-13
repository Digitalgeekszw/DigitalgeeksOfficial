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

export async function sendAcceptanceContractEmail({
  firstName,
  lastName,
  email,
  jobTitle,
  signingLink,
  adminName,
  adminTitle,
  adminDate,
}) {
  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `Internship Acceptance Letter - Digital Geeks`;
  const signedDateLabel = new Date(adminDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const text = [
    `Digital Geeks`,
    `www.digitalgeeks.tech`,
    `Email: contact@digitalgeeks.tech`,
    ``,
    `Date: ${signedDateLabel}`,
    ``,
    `To: ${fullName}`,
    `Subject: Internship Acceptance Letter`,
    ``,
    `Dear ${fullName},`,
    ``,
    `We are pleased to inform you that you have been selected for the ${jobTitle} internship role at Digital Geeks.`,
    `This letter serves as your internship acceptance agreement and outlines your formal acceptance into our team.`,
    ``,
    `Please review and sign your acceptance letter using the secure link below:`,
    `${signingLink}`,
    ``,
    `If you have any questions, contact us at contact@digitalgeeks.tech or visit www.digitalgeeks.tech.`,
    ``,
    `For Digital Geeks`,
    `${adminName}`,
    `${adminTitle}`,
    `Date: ${signedDateLabel}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:24px;background-color:#f5f7fb;font-family:'Times New Roman',Georgia,serif;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #d1d5db;">
    <tr>
      <td style="padding:0;">
        <img src="https://www.digitalgeeks.tech/contract-letterhead.svg" alt="DigitalGeeks Letterhead" style="width:100%;max-width:760px;height:auto;display:block;" />
      </td>
    </tr>

    <tr>
      <td style="padding:28px 40px 38px;">
        <p style="margin:0 0 8px;font-size:15px;"><strong>Date:</strong> ${signedDateLabel}</p>
        <p style="margin:0 0 14px;font-size:15px;"><strong>To:</strong> ${fullName}</p>
        <p style="margin:0 0 24px;font-size:15px;"><strong>Subject:</strong> Internship Acceptance Letter</p>

        <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">Dear ${fullName},</p>

        <p style="margin:0 0 14px;font-size:16px;line-height:1.8;">We are pleased to inform you that you have been selected for the <strong>${jobTitle}</strong> internship role at Digital Geeks.</p>
        <p style="margin:0 0 14px;font-size:16px;line-height:1.8;">This letter serves as your internship acceptance agreement and confirms your formal selection into our program.</p>
        <p style="margin:0 0 18px;font-size:16px;line-height:1.8;">Kindly review this letter and submit your acceptance by signing electronically using the secure link below.</p>

        <table cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
          <tr>
            <td style="border-radius:4px;background-color:#1e3a8a;">
              <a href="${signingLink}" target="_blank" style="display:inline-block;padding:12px 22px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">
                Review and Sign Acceptance Letter
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 22px;font-size:14px;color:#475569;word-break:break-all;">If the button does not work, use this link:<br /><a href="${signingLink}" style="color:#1e40af;text-decoration:none;">${signingLink}</a></p>

        <p style="margin:0 0 22px;font-size:16px;line-height:1.8;">If you need any clarification, please contact us at <a href="mailto:contact@digitalgeeks.tech" style="color:#1e40af;text-decoration:none;">contact@digitalgeeks.tech</a> or visit <a href="https://www.digitalgeeks.tech" style="color:#1e40af;text-decoration:none;">www.digitalgeeks.tech</a>.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
          <tr>
            <td style="width:50%;vertical-align:top;padding-right:12px;">
              <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Authorized by (Digital Geeks)</p>
              <p style="margin:0 0 20px;font-size:16px;">${adminName}</p>
              <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Title</p>
              <p style="margin:0 0 20px;font-size:16px;">${adminTitle}</p>
              <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Date</p>
              <p style="margin:0;font-size:16px;">${signedDateLabel}</p>
            </td>
            <td style="width:50%;vertical-align:top;padding-left:12px;">
              <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Candidate Signature</p>
              <p style="margin:0 0 20px;border-bottom:1px solid #cbd5e1;height:22px;"></p>
              <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Candidate Name</p>
              <p style="margin:0 0 20px;border-bottom:1px solid #cbd5e1;height:22px;"></p>
              <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Date</p>
              <p style="margin:0;border-bottom:1px solid #cbd5e1;height:22px;"></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <img src="https://www.digitalgeeks.tech/contract-footer.svg" alt="DigitalGeeks Footer" style="width:100%;max-width:760px;height:auto;display:block;" />
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: "Digital Geeks Careers <careers@digitalgeeks.tech>",
    reply_to: "contact@digitalgeeks.tech",
    to: email,
    subject,
    text,
    html,
  });
}

export async function sendOfferLetterEmail({ firstName, lastName, email, jobTitle, fileBuffer, fileName }) {
  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `Offer Letter – Digital Geeks`;

  const text = [
    `Dear ${fullName},`,
    ``,
    `We are delighted to offer you the position of ${jobTitle} at Digital Geeks.`,
    ``,
    `Please find your official offer letter attached to this email. Kindly review it carefully and respond at your earliest convenience.`,
    ``,
    `If you have any questions, feel free to contact us at careers@digitalgeeks.tech.`,
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
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Your Offer Letter</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Dear ${fullName},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">We are delighted to offer you the position of <strong>${jobTitle}</strong> at Digital Geeks.</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Please find your official offer letter attached to this email. Kindly review it carefully and respond at your earliest convenience.</p>
              <table cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Position Offered</p>
                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${jobTitle}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">If you have any questions, feel free to contact us at <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
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
    attachments: [{ filename: fileName, content: fileBuffer }],
  });
}

export async function sendManualContractEmail({ firstName, lastName, email, jobTitle, fileBuffer, fileName }) {
  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `Employment Contract – Digital Geeks`;

  const text = [
    `Dear ${fullName},`,
    ``,
    `Please find your employment contract for the ${jobTitle} position at Digital Geeks attached to this email.`,
    ``,
    `Kindly review the contract carefully, sign it, and return a signed copy to careers@digitalgeeks.tech.`,
    ``,
    `If you have any questions or require clarification, do not hesitate to contact us.`,
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
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Your Employment Contract</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Dear ${fullName},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Please find your employment contract for the <strong>${jobTitle}</strong> position at Digital Geeks attached to this email.</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Kindly review the contract carefully, sign it, and return a signed copy to <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
              <table cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Position</p>
                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${jobTitle}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">If you have any questions, feel free to contact us at <a href="mailto:careers@digitalgeeks.tech" style="color:#3b82f6;text-decoration:none;">careers@digitalgeeks.tech</a>.</p>
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
    attachments: [{ filename: fileName, content: fileBuffer }],
  });
}
