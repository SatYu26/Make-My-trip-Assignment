import { pool } from "../config/db";
import { redis } from "../config/redis";

export class SeatService {
    async initSeatTable() {
        await pool.query(`CREATE TABLE IF NOT EXISTS seats (
      id SERIAL PRIMARY KEY,
      flight_id INT NOT NULL,
      seat_number TEXT NOT NULL,
      status TEXT CHECK (status IN ('available', 'booked')) DEFAULT 'available'
    )`);
    }

    async getAvailableSeats(flightId: number): Promise<string[]> {
        const result = await pool.query(
            "SELECT seat_number FROM seats WHERE flight_id = $1 AND status = 'available'",
            [ flightId ]
        );
        return result.rows.map(row => row.seat_number);
    }

    async lockSeats(userId: string, flightId: number, seats: string[]) {
        const key = `lock:${userId}:${flightId}`;
        const lockData = JSON.stringify({ seats });

        await redis.setEx(key, 600, lockData); // 10 min lock
        return { message: "Seats locked", expiresIn: "10 minutes" };
    }

    async confirmBooking(userId: string, flightId: number) {
        const key = `lock:${userId}:${flightId}`;
        const data = await redis.get(key);
        if (!data) return { error: "No locked seats found" };

        const { seats } = JSON.parse(data);
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            for (const seat of seats) {
                const res = await client.query(
                    "UPDATE seats SET status = 'booked' WHERE flight_id = $1 AND seat_number = $2 AND status = 'available'",
                    [ flightId, seat ]
                );
                if (res.rowCount === 0) throw new Error(`Seat ${seat} already booked`);
            }

            await client.query("COMMIT");
            await redis.del(key);
            return { message: "Seats booked successfully", seats };
        } catch (e) {
            await client.query("ROLLBACK");
            const errorMessage = e instanceof Error ? e.message : String(e);
            return { error: errorMessage };
        } finally {
            client.release();
        }
    }
}
