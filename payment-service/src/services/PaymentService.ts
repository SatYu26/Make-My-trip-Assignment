import { pool } from "../config/db.js";
import { Payment } from "../models/Payment.js";
import crypto from "crypto";

export class PaymentService {
    async initTable() {
        await pool.query(`CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      booking_id INT UNIQUE NOT NULL,
      amount INT NOT NULL,
      status TEXT CHECK (status IN ('SUCCESS', 'FAILED')) NOT NULL,
      transaction_id TEXT NOT NULL
    )`);
    }

    async processPayment(bookingId: number, amount: number): Promise<Payment> {
        const status = Math.random() < 0.8 ? "SUCCESS" : "FAILED"; // 80% success rate
        const transaction_id = crypto.randomBytes(6).toString("hex");

        const result = await pool.query(
            `INSERT INTO payments (booking_id, amount, status, transaction_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [ bookingId, amount, status, transaction_id ]
        );

        return result.rows[ 0 ];
    }

    async getPaymentStatus(bookingId: number): Promise<Payment | null> {
        const result = await pool.query(
            `SELECT * FROM payments WHERE booking_id = $1`,
            [ bookingId ]
        );
        return result.rows[ 0 ] || null;
    }
}
