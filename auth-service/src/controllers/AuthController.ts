import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
    static async signup(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { token, userId } = await AuthService.signup(email, password);
            res.status(201).json({ token, userId });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { token, userId } = await AuthService.login(email, password);
            res.status(200).json({ token, userId });
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    }
}
