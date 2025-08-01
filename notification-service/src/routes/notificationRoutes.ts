import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController.js";

const router = Router();
router.post("/send", NotificationController.send);

export default router;
