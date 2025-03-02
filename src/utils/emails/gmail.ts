import nodemailer from "nodemailer";

export const sendEmail = async (
  subject: string,
  html: string
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
  };

  await transporter.sendMail(mailOptions);
};
