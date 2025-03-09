import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import { sendEmail } from "../utils/emails/gmail";
import path from "path";
import "dotenv/config";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: "/snap/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
    timeout: 120000,
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
    console.log("QR Code generated and sent via email.");
  } catch (error) {
    console.error("Error sending mail:", error);
  }
});

client.on("ready", async () => {
  try {
    console.log("Client is ready!");
    await sendEmail(
      "Successful WhatsApp session startup",
      `<img src="${baseUrl}/img/2.jpg">`
    );
  } catch (error) {
    console.error("Error sending ready email:", error);
  }
});

client.on("auth_failure", async (msg: string) => {
  try {
    console.error("Authentication failure:", msg);
    await sendEmail(
      "Start of session WhatsApp failure",
      `
        <p>Error message: ${msg}</p>
        <img src="${baseUrl}/img/3.jpg">
      `
    );
  } catch (error) {
    console.error("Error sending auth failure email:", error);
  }
});

client.on("disconnected", async () => {
  try {
    console.warn("Client disconnected!");
    await sendEmail(
      "Disconnected from WhatsApp client",
      `<img src="${baseUrl}/img/1.jpg">`
    );

    setTimeout(() => {
      console.log("Reinitializing client...");
      client.initialize();
    }, 5000);
  } catch (error) {
    console.error("Error handling disconnection:", error);
  }
});

try {
  client.initialize();
  console.log("Client initialized.");
} catch (error) {
  console.error("Error initializing client:", error);
}

export default client;
