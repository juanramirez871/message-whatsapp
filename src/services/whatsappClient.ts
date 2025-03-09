import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import { sendEmail } from "../utils/emails/gmail";
import path from "path";
import "dotenv/config";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

const qrImagePath: string = path.join(__dirname, "qrCode.png");
const baseUrl: string = process.env.BASE_URL || "http://localhost:3000";

client.on("qr", async (qr: string) => {
  try {
    await qrcode.toFile(qrImagePath, qr);
    await qrcode.toDataURL(qr);
    await sendEmail(
      "QR Code for WhatsApp",
      `
        <h3>Scan the following QR code to authenticate WhatsApp Web 😊</h3>
        <img src="cid:qrcode" alt="Code QR">
      `,
      [
        {
          filename: "qrCode.png",
          path: qrImagePath,
          cid: "qrcode",
        },
      ]
    );
  } catch (error) {
    console.error("Error sending mail:", error);
  }
});

client.on("ready", async () => {
  await sendEmail(
    "Successful WhatsApp session startup",
    `<img src="${baseUrl}/img/2.jpg">`
  );
});

client.on("auth_failure", async (msg: string) => {
  await sendEmail(
    "Start of session WhatsApp failure",
    `
        <p>Error message: ${msg}</p>
        <img src="${baseUrl}/img/3.jpg">
    `
  );
});

client.on("disconnected", async () => {
  await sendEmail(
    "Disconnected from whatsApp client",
    `
    <img src="${baseUrl}/img/1.jpg">
    `
  );
  client.initialize();
});

client.initialize();

export default client;
