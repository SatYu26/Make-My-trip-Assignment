import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[ 1 ];
    if (!token) return res.status(401).json({ message: "Missing token" });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}
