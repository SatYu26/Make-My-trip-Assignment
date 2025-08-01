import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

const authService = new AuthService();
await authService.initUserTable();

export class AuthController {
    static async signup(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Missing fields" });

        try {
            const user = await authService.signup(email, password);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json({ error: "Email already in use" });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        if (!token) return res.status(401).json({ error: "Invalid credentials" });

        return res.json({ token });
    }
}
