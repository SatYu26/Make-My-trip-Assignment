import { Request, Response } from "express";
import { BookingService } from "../services/BookingService.js";

const service = new BookingService();
await service.initTables();

export class BookingController {
    static async book(req: Request, res: Response) {
        const result = await service.createBooking(req.body);
        if ("error" in result) return res.status(400).json(result);
        return res.status(201).json(result);
    }
}
