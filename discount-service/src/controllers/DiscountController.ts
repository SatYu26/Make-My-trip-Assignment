import { Request, Response } from "express";
import { DiscountService } from "../services/DiscountService";

const service = new DiscountService();
await service.initTable();

export class DiscountController {
    static async validate(req: Request, res: Response) {
        const { code, total } = req.body;
        if (!code || typeof total !== "number") {
            return res.status(400).json({ error: "Missing code or total" });
        }

        const result = await service.applyDiscount(code, total);
        if ("error" in result) return res.status(400).json(result);
        return res.json(result);
    }
}
