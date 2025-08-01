import { Request, Response } from "express";
import { NotificationService } from "../services/NotificationService";

const service = new NotificationService();

export class NotificationController {
    static async send(req: Request, res: Response) {
        const { to, type, subject, message } = req.body;
        if (!to || !type || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await service.send({ to, type, subject, message });
        return res.json(result);
    }
}
