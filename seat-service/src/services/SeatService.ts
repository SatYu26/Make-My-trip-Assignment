import { pool } from "../config/db.js";
import { redisClient } from "../config/redis.js";
import { invalidateCache } from "../utils/cacheUtils.js";

export class SeatService {
    static async getAvailableSeats(flightId: number) {
        const cacheKey = `seats:${flightId}`;
        const cached = await redisClient.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const result = await pool.query(
            "SELECT seat_number FROM seats WHERE flight_id = $1 AND is_booked = false",
            [ flightId ]
        );

        const seats = result.rows.map(row => row.seat_number);
        await redisClient.setEx(cacheKey, 300, JSON.stringify(seats));
        return seats;
    }

    static async lockSeat(flightId: number, seatNumber: string, userId: string) {
        await pool.query(
            "UPDATE seats SET is_booked = true, booked_by = $1 WHERE flight_id = $2 AND seat_number = $3 AND is_booked = false",
            [ userId, flightId, seatNumber ]
        );

        await invalidateCache(flightId);
        return { flightId, seatNumber };
    }
}
