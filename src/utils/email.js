import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const STATUS_MESSAGES = {
  Reviewed: {
    subject: "Your Application Has Been Reviewed – Digital Geeks",
    heading: "Application Under Review",
    body: "We've completed an initial review of your application and are giving it serious consideration. Our team will be in touch with further updates as we move through our selection process.",
  },
  "Interview Scheduled": {
    subject: "Interview Invitation – Digital Geeks",
    heading: "You've Been Selected for an Interview!",
    body: "Congratulations! We were impressed by your application and would like to invite you to an interview. A member of our team will reach out to you shortly with the interview details, including the date, time, and format.",
  },
  Rejected: {
    subject: "Update on Your Application – Digital Geeks",
    heading: "Application Status Update",
    body: "Thank you for your interest in joining Digital Geeks and for the time you invested in your application. After careful consideration, we have decided not to move forward with your application at this time. We encourage you to apply for future openings that match your skills and experience.",
  },
  Hired: {
    subject: "Congratulations! You've Been Selected – Digital Geeks",
    heading: "Welcome to Digital Geeks!",
    body: "We are thrilled to let you know that you have been selected for the position! Our team will be reaching out to you very shortly with all the details regarding your onboarding, start date, and next steps. Welcome aboard — we can't wait to have you on the team!",
  },
};

function buildPlainText({ fullName, jobTitle, body, fromEmail }) {
  return [
    `Dear ${fullName},`,
    ``,
    body,
    ``,
    `Position Applied For: ${jobTitle}`,
    ``,
    `If you have any questions, feel free to reply to this email or contact us at ${fromEmail}.`,
    ``,
    `--`,
    `Digital Geeks — Technology & Innovation`,
    `© ${new Date().getFullYear()} Digital Geeks. All rights reserved.`,
    `This email was sent regarding your job application.`,
  ].join("\n");
}

export async function sendApplicationStatusEmail({ firstName, lastName, email, jobTitle, status }) {
  const template = STATUS_MESSAGES[status];
  if (!template) return; // No email for "Pending" or unknown statuses

  const fullName = `${firstName} ${lastName}`;
  const fromEmail = process.env.SMTP_USER;

  const text = buildPlainText({ fullName, jobTitle, body: template.body, fromEmail });

  const html = `
<!DOCTYPE html>
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
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:${fromEmail}" style="color:#3b82f6;text-decoration:none;">${fromEmail}</a>.</p>
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
</html>`.trim();

  await transporter.sendMail({
    from: `"Digital Geeks Careers" <${fromEmail}>`,
    replyTo: fromEmail,
    to: email,
    subject: template.subject,
    text,
    html,
  });
}
