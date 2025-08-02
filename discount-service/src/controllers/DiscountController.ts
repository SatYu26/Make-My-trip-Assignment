import { Request, Response } from "express";
import { pool } from "../config/db.js";
import { Pool } from "pg";
import dotenv from "dotenv";
import { seedDiscounts } from '../seed/seedDiscounts.js';

dotenv.config();

export const applyDiscount = async (req: Request, res: Response) => {
    await seedDiscounts();
    const { bookingId, code } = req.body;

    if (!bookingId || !code) {
        return res.status(400).json({ message: "Missing bookingId or discount code." });
    }

    const { rows: discountRows } = await pool.query(
        `SELECT * FROM discounts WHERE code = $1 AND is_active = true`,
        [ code ]
    );

    if (discountRows.length === 0) {
        return res.status(404).json({ message: "Invalid or expired discount code." });
    }

    const discount = discountRows[ 0 ];

    // Simulate booking status validation (to restrict flow)
    const bookingPool = new Pool({
        connectionString: process.env.BOOKING_DATABASE_URL,
    });
    const { rows: bookingRows } = await bookingPool.query(
        `SELECT status FROM bookings WHERE id = $1`,
        [ bookingId ]
    );

    if (!bookingRows.length || bookingRows[ 0 ].status !== 'SUCCESS') {
        return res.status(400).json({ message: "Discount can only be applied after payment." });
    }

    // Apply discount
    const finalAmount = Math.max(0, bookingRows[ 0 ].price - discount.amount);

    res.json({ message: "Discount applied", finalAmount });
};
