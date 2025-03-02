import nodemailer from "nodemailer";
import "dotenv/config";

export const sendEmail = async (
  subject: string,
  html: string,
  attachments: any[] = []
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject,
    html,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};
