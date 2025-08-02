import { Request, Response } from 'express';
import { pool } from '../config/db.js';
import { getCachedFlights, setCachedFlights } from '../utils/cache.js';
import { seed } from "../seed/seedFlights.js";
import axios from "axios";


export const searchFlights = async (req: Request, res: Response) => {
  const { source, destination, date } = req.query;

  const authHeader = req.headers[ "authorization" ];
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const cacheKey = `flights:${source}-${destination}-${date}`;
  const cached = await getCachedFlights(cacheKey);
  if (cached) return res.json(cached);
  await seed();
  try {
    // 1. Fetch flights from DB
    const result = await pool.query(`
      SELECT id, source, destination, departure_time, arrival_time, date, flight_number
      FROM flights
      WHERE source = $1 AND destination = $2 AND date = $3 AND is_cancelled = false
    `, [ source, destination, date ]);

    const flights = result.rows;

    // 2. Enrich with available seat info from Seat Service (authenticated call)
    const enrichedFlights = await Promise.all(
      flights.map(async (flight) => {
        try {
          const seatRes = await axios.get(
            `${process.env.SEAT_SERVICE_URL}/api/seats/${flight.id}`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          return {
            ...flight,
            available_seats: (seatRes.data as { availableSeats: number }).availableSeats,
          };
        } catch (err) {
          if (err instanceof Error) {
            console.error(`Seat service error for flight ${flight.id}:`, err.message);
          } else {
            console.error(`Seat service error for flight ${flight.id}:`, err);
          }
          return {
            ...flight,
            available_seats: null,
          };
        }
      })
    );

    // 3. Cache the enriched response
    await setCachedFlights(cacheKey, enrichedFlights);

    return res.json(enrichedFlights);
  } catch (err) {
    console.error("Flight search error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

