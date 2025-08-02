import { pool } from "../config/db.js";

export class PaymentService {
    static async processPayment(bookingId: string, userId: string, amount: number) {
        // Validate booking exists and belongs to user
        const result = await pool.query(
            `SELECT * FROM bookings WHERE id = $1 AND user_id = $2`,
            [ bookingId, userId ]
        );

        if (result.rows.length === 0) {
            throw new Error("Booking not found or not authorized");
        }

        // Prevent duplicate payments
        const paymentCheck = await pool.query(
            `SELECT * FROM payments WHERE booking_id = $1`,
            [ bookingId ]
        );
        if (paymentCheck.rows.length > 0) {
            throw new Error("Payment already made for this booking");
        }

        // Proceed to insert payment
        await pool.query(
            `INSERT INTO payments (booking_id, user_id, amount, status)
       VALUES ($1, $2, $3, $4)`,
            [ bookingId, userId, amount, "SUCCESS" ]
        );

        return { message: "Payment successful" };
    }
}
