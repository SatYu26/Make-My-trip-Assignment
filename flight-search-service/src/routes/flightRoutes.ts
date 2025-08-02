import { Router } from "express";
import { FlightController } from "../controllers/FlightController.js";
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.get("/search", authenticateJWT, FlightController.searchFlights);
router.get("/direct", authenticateJWT, FlightController.directFlights);


export default router;
