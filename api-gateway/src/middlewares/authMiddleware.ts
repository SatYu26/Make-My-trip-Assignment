import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes("signup") || req.path.includes("login")) {
        console.log("Skipping authentication for signup/login routes");
        return next();
    }
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Missing token" });

    const token = authHeader.split(" ")[ 1 ];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
