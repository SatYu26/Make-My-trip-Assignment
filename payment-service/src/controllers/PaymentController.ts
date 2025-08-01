import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService.js";

const service = new PaymentService();
await service.initTable();

export class PaymentController {
    static async pay(req: Request, res: Response) {
        const { bookingId, amount } = req.body;
        if (!bookingId || !amount) {
            return res.status(400).json({ error: "Missing bookingId or amount" });
        }

        const result = await service.processPayment(bookingId, amount);
        return res.status(201).json(result);
    }

    static async status(req: Request, res: Response) {
        const bookingId = Number(req.params.bookingId);
        const result = await service.getPaymentStatus(bookingId);
        if (!result) return res.status(404).json({ error: "Not found" });
        return res.json(result);
    }
}
