import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { generateToken } from "../utils/Jwt.js";

export class AuthService {
    static async signup(email: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
            [ email, hashed ]
        );
        const userId = result.rows[ 0 ].id;
        const token = generateToken(userId);
        return { token, userId };
    }

    static async login(email: string, password: string) {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [ email ]);
        if (!result.rows.length) throw new Error("User not found");

        const user = result.rows[ 0 ];
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid credentials");

        const token = generateToken(user.id);
        return { token, userId: user.id };
    }

    async initUserTable(): Promise<void> {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);
    }
}

