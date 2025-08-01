import { Router } from "express";
import { DiscountController } from "../controllers/DiscountController";

const router = Router();
router.post("/apply", DiscountController.validate);

export default router;
