import { Request, Response } from "express";
import { SeatService } from "../services/SeatService.js";

export const getAvailableSeats = async (req: Request, res: Response) => {
    const flightId = Number(req.params.flightId);
    const seats = await SeatService.getAvailableSeats(flightId);
    res.json({ flightId, availableSeats: seats });
};

export const lockSeat = async (req: Request, res: Response) => {
    const { flightId, seatNumber } = req.body;
    const userId = req.body.userId || (req as any).user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await SeatService.lockSeat(flightId, seatNumber, userId);
    res.json({ message: "Seat locked", ...result });
};
