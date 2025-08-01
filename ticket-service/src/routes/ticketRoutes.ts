import { Router } from "express";
import { TicketController } from "../controllers/TicketController";

const router = Router();
router.get("/:bookingId", TicketController.getTicket);

export default router;
