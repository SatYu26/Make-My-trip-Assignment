import { Router } from "express";
import { SeatController } from "../controllers/SeatController";

const router = Router();
router.get("/available", SeatController.getAvailable);
router.post("/lock", SeatController.lock);
router.post("/confirm", SeatController.confirm);

export default router;
