import nodemailer from "nodemailer";

const sendEmail = async (
  subject: string,
  html: string,
  addressee: string = process.env.GMAIL_FROM || "noreply@gmail.com"
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_FROM,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_FROM,
    to: addressee,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
};

export { sendEmail };
