import { Router } from "express";
import { TicketController } from "../controllers/TicketController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/generate", authenticateJWT, TicketController.generateTicket);
router.get("/:id", authenticateJWT, TicketController.getTicket);

export default router;
