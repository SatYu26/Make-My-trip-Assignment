// src/controllers/bookingController.ts
import { Request, Response } from "express";
import { BookingService } from "../services/BookingService.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

export class BookingController {
    static async createBooking(req: Request, res: Response) {
        const userId = req.user?.id; // from JWT middleware
        const { flightId, seats, price } = req.body;

        if (!flightId || !seats || !price) {
            return res.status(400).json({ error: "Missing booking details" });
        }

        try {
            const booking = await BookingService.createBooking({ userId, flightId, seats, price });
            res.status(201).json({ message: "Booking created", booking });
        } catch (err) {
            res.status(500).json({ error: "Failed to create booking", details: err.message });
        }
    }

    static async getBooking(req: Request, res: Response) {
        const bookingId = req.params.id;
        const userId = req.user?.id;

        try {
            const booking = await BookingService.getBooking(bookingId, userId);
            if (!booking) return res.status(404).json({ error: "Booking not found" });
            res.status(200).json(booking);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch booking", details: err.message });
        }
    }
}
