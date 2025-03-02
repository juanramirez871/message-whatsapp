import express, { Request, Response } from "express";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import { sendEmail } from "./utils/emails/gmail";

const app = express();
const port = 3000;

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", async (qr: string) => {
  try {
    const qrCodeDataUrl = await qrcode.toDataURL(qr);
    await sendEmail(
      "QR Code for WhatsApp",
      `
        <h3>Scan the following QR code to authenticate WhatsApp Web 😊</h3>
        <img src="${qrCodeDataUrl}" alt="Code QR">
      `
    );
  } catch (error) {
    console.error("Error sending mail:", error);
  }
});

client.on("ready", async () => {
  await sendEmail(
    "Successful WhatsApp session startup",
    `<img src="https://pm1.aminoapps.com/6362/2b77e77b14592fda4b450500a04bbb89c83a59c7_hq.jpg">`
  );
});

client.on("auth_failure", async (msg: string) => {
  await sendEmail(
    "Start of session WhatsApp failure",
    `
        <p>Error message: ${msg}</p>
        <img src="https://i.pinimg.com/736x/ad/2c/2e/ad2c2e84b83be5afb7b9e94e5d859f39.jpg">
    `
  );
});

client.on("disconnected", async (reason: string) => {
  await sendEmail(
    "Disconnected from whatsApp client",
    `
    <p>Reason: ${reason}</p>
    <img src="https://external-preview.redd.it/NIycFW-95BU8LyFDE80dY4zq2nq5OPxsupj_J_-fdXw.jpg?auto=webp&s=f6c1c60321a8e46e0a9267813385c4b2164e2a24">
    `
  );
});

client.initialize();

app.get("/send-message", async (req: Request, res: Response): Promise<any> => {
  const number = req.query.number as string;
  const message = req.query.message as string;
  if (!number || !message) {
    return res.status(400).json({
      status: "error",
      message: "Number and message are required",
    });
  }
  try {
    const chatId = `${number}@c.us`;
    const response = await client.sendMessage(chatId, message);

    res.json({
      status: "success",
      message: "Message sent successfully",
      response,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      status: "error",
      message: "Error sending message",
      error: errorMessage,
    });
  }
});

app.listen(port, () => {
  console.log(`server listening... http://localhost:${port}`);
});
