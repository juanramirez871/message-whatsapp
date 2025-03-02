import express from "express";
import { createServer } from "./config/serverConfig";
import whatsappRoutes from "./routes/whatsappRoutes";
import "dotenv/config";

const app = express();
const port: number = parseInt(process.env.PORT || "3001");

createServer(app, port);
app.use("/whatsapp", whatsappRoutes);
