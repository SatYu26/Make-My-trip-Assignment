import { Router } from "express";
import { BookingController } from "../controllers/BookingController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", verifyAuth, BookingController.createBooking);
router.get("/:id/:userId", verifyAuth, BookingController.getBooking);

export default router;