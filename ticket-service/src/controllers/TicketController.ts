import { Request, Response } from "express";
import { TicketService } from "../services/TicketService.js";

const service = new TicketService();

export class TicketController {
    static async getTicket(req: Request, res: Response) {
        const bookingId = Number(req.params.bookingId);
        const ticket = await service.fetchTicket(bookingId);

        if (!ticket) {
            return res.status(404).json({ error: "Booking not found" });
        }

        return res.json(ticket);
    }
}
