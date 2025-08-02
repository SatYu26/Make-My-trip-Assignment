import { Request, Response } from "express";
import { pool } from "../config/db.js";

export const applyDiscount = async (req: Request, res: Response) => {
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
    const { rows: bookingRows } = await pool.query(
        `SELECT status FROM bookings WHERE id = $1`,
        [ bookingId ]
    );

    if (!bookingRows.length || bookingRows[ 0 ].status !== 'PAID') {
        return res.status(400).json({ message: "Discount can only be applied after payment." });
    }

    // Apply discount
    const finalAmount = Math.max(0, bookingRows[ 0 ].amount - discount.amount);

    res.json({ message: "Discount applied", finalAmount });
};
