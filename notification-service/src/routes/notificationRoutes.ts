import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const router = Router();
router.post("/send", NotificationController.send);

export default router;
