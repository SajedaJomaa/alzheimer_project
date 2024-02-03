import nodemailer from "nodemailer";
export async function sendEmail(to, subject, html, attachments) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILSENDER,
      pass: process.env.PASSWORDSENDER,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"Alzheimer_Project" <${process.env.EMAILSENDER}>`,
    to,
    subject,
    html,
    attachments,
  });
  return info;
}
