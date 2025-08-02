import { Request, Response } from 'express';
import { pool } from '../config/db.js';
import { getCachedFlights, setCachedFlights } from '../utils/cache.js';
import { seed } from "../seed/seedFlights.js";

await seed();
export const searchFlights = async (req: Request, res: Response) => {
    const { source, destination, date } = req.query;
    const cacheKey = `flights:${source}-${destination}-${date}`;
    const cached = await getCachedFlights(cacheKey);
    if (cached) return res.json(cached);

    const result = await pool.query(`
    SELECT f.id, f.source, f.destination, f.departure_time, f.arrival_time, f.date, f.flight_number,
    (SELECT COUNT(*) FROM seats WHERE flight_id = f.id AND is_booked = false) as available_seats
    FROM flights f
    WHERE source = $1 AND destination = $2 AND date = $3 AND is_cancelled = false
  `, [ source, destination, date ]);

    await setCachedFlights(cacheKey, result.rows);
    return res.json(result.rows);
};

