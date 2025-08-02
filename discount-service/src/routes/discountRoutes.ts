import { Router } from "express";
import { applyDiscount } from "../controllers/DiscountController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/apply", authenticateJWT, applyDiscount);

export default router;
