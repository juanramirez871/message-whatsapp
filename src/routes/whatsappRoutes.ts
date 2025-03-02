import { Router } from "express";
import { sendMessage } from "../controllers/whatsappController";

const router = Router();

router.get("/send-message", sendMessage);

export default router;
