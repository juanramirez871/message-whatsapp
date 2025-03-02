import { Request, Response } from "express";
import client from "../services/whatsappClient";
import "dotenv/config";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const number = req.query.number as string;
  const message = req.query.message as string;

  if (!number || !message) {
    res.status(400).json({
      status: "error",
      message: "Number and message are required",
    });
    return;
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
};
