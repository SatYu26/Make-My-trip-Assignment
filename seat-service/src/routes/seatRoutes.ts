import { Router } from "express";
import { getAvailableSeats, lockSeat } from "../controllers/SeatController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:flightId", authenticateJWT, getAvailableSeats);
router.post("/lock", authenticateJWT, lockSeat);

export default router;
