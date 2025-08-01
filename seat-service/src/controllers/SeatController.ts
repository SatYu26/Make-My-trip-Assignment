import { Request, Response } from "express";
import { SeatService } from "../services/SeatService.js";

const service = new SeatService();
await service.initSeatTable();

export class SeatController {
    static async getAvailable(req: Request, res: Response) {
        const flightId = Number(req.query.flightId);
        const seats = await service.getAvailableSeats(flightId);
        return res.json({ seats });
    }

    static async lock(req: Request, res: Response) {
        const { userId, flightId, seats } = req.body;
        const result = await service.lockSeats(userId, flightId, seats);
        return res.json(result);
    }

    static async confirm(req: Request, res: Response) {
        const { userId, flightId } = req.body;
        const result = await service.confirmBooking(userId, flightId);
        return res.json(result);
    }
}
