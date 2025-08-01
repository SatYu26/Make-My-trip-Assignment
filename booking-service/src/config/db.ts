import { Pool } from "pg";
import dotenv from "dotenv";
import { retry } from "../utils/retry.js";
dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function connectToDB() {
    await retry(async () => {
        const client = await pool.connect();
        await client.query('SELECT 1'); // dummy ping
        client.release();
        console.log('✅ Connected to Postgres');
    }, 5, 3000); // 5 retries with 3s delay
}