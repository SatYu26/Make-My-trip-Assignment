import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService.js";

export class PaymentController {
    static async makePayment(req: Request, res: Response) {
        try {
            const { userId, bookingId, amount } = req.body;

            if (!bookingId || !amount) {
                return res.status(400).json({ error: "bookingId and amount are required" });
            }

            const result = await PaymentService.processPayment(bookingId, userId, amount);
            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to process payment" });
        }
    }
}
