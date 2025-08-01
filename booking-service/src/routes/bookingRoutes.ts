import { Router } from "express";
import { BookingController } from "../controllers/BookingController.js";

const router = Router();
router.post("/create", BookingController.book);

export default router;
