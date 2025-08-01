import { pool } from "../config/db";

export class DiscountService {
    async initTable() {
        await pool.query(`CREATE TABLE IF NOT EXISTS discounts (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      type TEXT CHECK (type IN ('COUPON', 'CARD')) NOT NULL,
      value INT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      usage_limit INT NOT NULL,
      used_count INT DEFAULT 0
    )`);

        await pool.query(`INSERT INTO discounts (code, type, value, expires_at, usage_limit)
      VALUES 
        ('FLAT500', 'COUPON', 500, NOW() + INTERVAL '30 days', 100),
        ('HDFC1000', 'CARD', 1000, NOW() + INTERVAL '30 days', 50)
      ON CONFLICT DO NOTHING`);
    }

    async applyDiscount(code: string, total: number): Promise<{ finalAmount: number, discountApplied: number } | { error: string }> {
        const result = await pool.query(`SELECT * FROM discounts WHERE code = $1`, [ code ]);
        const discount = result.rows[ 0 ];

        if (!discount) return { error: "Invalid code" };
        if (new Date(discount.expires_at) < new Date()) return { error: "Code expired" };
        if (discount.used_count >= discount.usage_limit) return { error: "Code usage limit reached" };

        const newAmount = total - discount.value;
        const discounted = newAmount < 0 ? 0 : newAmount;

        await pool.query(`UPDATE discounts SET used_count = used_count + 1 WHERE code = $1`, [ code ]);

        return {
            finalAmount: discounted,
            discountApplied: discount.value
        };
    }
}
