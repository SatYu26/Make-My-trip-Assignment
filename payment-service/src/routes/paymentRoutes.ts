import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/pay", authenticate, PaymentController.makePayment);

export default router;
