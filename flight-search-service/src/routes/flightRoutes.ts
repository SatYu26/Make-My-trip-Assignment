import { Router } from "express";
import { FlightController } from "../controllers/FlightController.js";

const router = Router();
router.get("/search", FlightController.searchFlights);
router.get("/direct", FlightController.directFlights);

export default router;
