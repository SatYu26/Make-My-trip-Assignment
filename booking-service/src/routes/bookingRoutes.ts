import { Router } from "express";
import { BookingController } from "../controllers/BookingController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/bookings", verifyAuth, BookingController.createBooking);
router.get("/bookings/:id", verifyAuth, BookingController.getBooking);

export default router;