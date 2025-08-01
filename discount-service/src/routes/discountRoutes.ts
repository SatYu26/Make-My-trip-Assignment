import { Router } from "express";
import { DiscountController } from "../controllers/DiscountController.js";

const router = Router();
router.post("/apply", DiscountController.validate);

export default router;
