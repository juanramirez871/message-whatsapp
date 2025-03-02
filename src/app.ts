import express from "express";
import { createServer } from "./config/serverConfig";
import whatsappRoutes from "./routes/whatsappRoutes";
import path from "path";
import "dotenv/config";

const app = express();
const port: number = parseInt(process.env.PORT || "3001");

createServer(app, port);

app.use(express.static(path.join(__dirname, "public")));
app.use("/whatsapp", whatsappRoutes);
