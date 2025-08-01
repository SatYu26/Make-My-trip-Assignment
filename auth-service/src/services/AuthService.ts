import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export class AuthService {
    async signup(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
            [ email, hashedPassword ]
        );
        return result.rows[ 0 ];
    }

    async login(email: string, password: string): Promise<string | null> {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [ email ]);
        const user = result.rows[ 0 ];

        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        return token;
    }

    async initUserTable(): Promise<void> {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);
    }
}
