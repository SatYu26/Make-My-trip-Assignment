import { pool } from "../config/db";
import axios from "axios";
import { Booking, Passenger } from "../models/Booking";

export class BookingService {
    async initTables() {
        await pool.query(`CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      flight_id INT NOT NULL,
      total_amount INT NOT NULL,
      status TEXT CHECK (status IN ('PENDING', 'CONFIRMED', 'FAILED')) DEFAULT 'PENDING'
    )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS passengers (
      id SERIAL PRIMARY KEY,
      booking_id INT REFERENCES bookings(id),
      name TEXT NOT NULL,
      age INT NOT NULL,
      email TEXT NOT NULL,
      seat_number TEXT NOT NULL
    )`);
    }

    async createBooking(data: Booking) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const result = await client.query(
                `INSERT INTO bookings (user_id, flight_id, total_amount, status)
         VALUES ($1, $2, $3, $4) RETURNING id`,
                [ data.user_id, data.flight_id, data.total_amount, "PENDING" ]
            );
            const bookingId = result.rows[ 0 ].id;

            for (const passenger of data.passengers) {
                await client.query(
                    `INSERT INTO passengers (booking_id, name, age, email, seat_number)
           VALUES ($1, $2, $3, $4, $5)`,
                    [ bookingId, passenger.name, passenger.age, passenger.email, passenger.seat_number ]
                );
            }

            const seatConfirm = await axios.post(
                process.env.SEAT_SERVICE_URL!,
                {
                    userId: data.user_id,
                    flightId: data.flight_id
                }
            );

            const seatData = seatConfirm.data as { error?: string };
            if (seatData.error) {
                throw new Error(seatData.error);
            }

            await client.query(
                `UPDATE bookings SET status = 'CONFIRMED' WHERE id = $1`,
                [ bookingId ]
            );

            await client.query("COMMIT");
            return { bookingId, status: "CONFIRMED" };
        } catch (e) {
            await client.query("ROLLBACK");
            if (e instanceof Error) {
                return { error: e.message };
            }
            return { error: "Unknown error occurred" };
        } finally {
            client.release();
        }
    }
}
