import { Request, Response } from "express";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
export class TicketController {
    static async generateTicket(req: Request, res: Response) {
        const { booking_id } = req.body;
        if (!booking_id) return res.status(400).json({ message: "Missing booking_id" });

        try {
            const bookingPool = new Pool({
                connectionString: process.env.BOOKING_DATABASE_URL,
            });
            const result = await bookingPool.query(
                `SELECT * FROM bookings WHERE id = $1`,
                [ booking_id ]
            );

            const booking = result.rows[ 0 ];
            if (!booking) return res.status(404).json({ message: "Booking not found" });

            const ticketResult = await pool.query(
                `INSERT INTO tickets (booking_id, user_id, flight_id, seat_number, price)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
                [ booking_id, booking.user_id, booking.flight_id, booking.seats, booking.price ]
            );

            res.status(201).json(ticketResult.rows[ 0 ]);
        } catch (err) {
            console.error("Error generating ticket:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getTicket(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const result = await pool.query(
                `SELECT * FROM tickets WHERE id = $1`,
                [ id ]
            );

            if (result.rows.length === 0) return res.status(404).json({ message: "Ticket not found" });
            res.json(result.rows[ 0 ]);
        } catch (err) {
            console.error("Error fetching ticket:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
