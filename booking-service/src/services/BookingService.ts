import { pool } from "../config/db.js";

export class BookingService {
    static async createBooking({
        userId,
        flightId,
        seats,
        price
    }: {
        userId: string;
        flightId: string;
        seats: number;
        price: number;
    }) {
        const result = await pool.query(
            `INSERT INTO bookings (user_id, flight_id, seats, price, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [ userId, flightId, seats, price, "PENDING" ]
        );
        return result.rows[ 0 ];
    }

    static async getBooking(bookingId: string, userId: string) {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE id = $1 AND user_id = $2`,
            [ bookingId, userId ]
        );
        return result.rows[ 0 ];
    }
}
