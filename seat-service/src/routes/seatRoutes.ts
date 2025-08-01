import { Router, Request, Response } from "express";
import { SeatController } from "../controllers/SeatController.js";

const router = Router();
router.get("/health", (_req: Request, res: Response) => {
    res.sendStatus(200);
});
router.get("/available", SeatController.getAvailable);
router.post("/lock", SeatController.lock);
router.post("/confirm", SeatController.confirm);

export default router;
