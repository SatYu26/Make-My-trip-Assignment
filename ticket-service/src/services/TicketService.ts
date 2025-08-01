import { pool } from "../config/db.js";
import { Ticket } from "../models/Ticket.js";

export class TicketService {
    async fetchTicket(bookingId: number): Promise<Ticket | null> {
        const bookingRes = await pool.query(
            `SELECT * FROM bookings WHERE id = $1`,
            [ bookingId ]
        );

        if (bookingRes.rowCount === 0) return null;

        const booking = bookingRes.rows[ 0 ];

        const passengersRes = await pool.query(
            `SELECT name, age, email, seat_number FROM passengers WHERE booking_id = $1`,
            [ bookingId ]
        );

        return {
            booking_id: booking.id,
            user_id: booking.user_id,
            flight_id: booking.flight_id,
            total_amount: booking.total_amount,
            status: booking.status,
            passengers: passengersRes.rows
        };
    }
}
