import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[ 1 ];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};
