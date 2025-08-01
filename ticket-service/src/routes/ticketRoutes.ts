import { Router } from "express";
import { TicketController } from "../controllers/TicketController.js";

const router = Router();
router.get("/:bookingId", TicketController.getTicket);

export default router;
