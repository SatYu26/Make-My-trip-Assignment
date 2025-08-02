import { pool } from "../config/db.js";

const discounts = [
    { code: "FLY100", amount: 100 },
    { code: "SAVE200", amount: 200 },
    { code: "NEW50", amount: 50 },
];

export async function seedDiscounts() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS discounts (
            id SERIAL PRIMARY KEY,
            code TEXT UNIQUE NOT NULL,
            amount INTEGER NOT NULL,
            is_active BOOLEAN DEFAULT true
        )
    `);

    for (const d of discounts) {
        await pool.query(
            `INSERT INTO discounts (code, amount) VALUES ($1, $2)
             ON CONFLICT (code) DO NOTHING`,
            [ d.code, d.amount ]
        );
    }

    console.log("✅ Discounts seeded");
}

seedDiscounts();
