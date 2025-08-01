import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController.js";

const router = Router();
router.post("/pay", PaymentController.pay);
router.get("/status/:bookingId", PaymentController.status);

export default router;
