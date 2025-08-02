import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "flight_secret";

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET) as { userId: string };
};
