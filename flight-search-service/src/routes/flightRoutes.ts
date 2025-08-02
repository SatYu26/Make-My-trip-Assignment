import { Router } from "express";
import { searchFlights } from "../controllers/FlightController.js";
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.get("/search", authenticateJWT, searchFlights);

export default router;
