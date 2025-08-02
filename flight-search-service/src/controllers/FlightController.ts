import { Request, Response } from 'express';
import { pool } from '../config/db.js';
import { getCachedFlights, setCachedFlights } from '../utils/cache.js';
import { seed } from "../seed/seedFlights.js";

export const searchFlights = async (req: Request, res: Response) => {
  const { source, destination, date } = req.query;
  const cacheKey = `flights:${source}-${destination}-${date}`;
  const cached = await getCachedFlights(cacheKey);
  if (cached) return res.json(cached);
  await seed();
  const result = await pool.query(`
      SELECT id, source, destination, departure_time, arrival_time, date, flight_number
      FROM flights
      WHERE source = $1 AND destination = $2 AND date = $3 AND is_cancelled = false
    `, [ source, destination, date ]);

  await setCachedFlights(cacheKey, result.rows);
  return res.json(result.rows);
};

