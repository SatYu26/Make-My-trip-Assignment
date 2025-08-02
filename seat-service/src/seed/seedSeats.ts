import { pool } from "../config/db.js";

export async function seedSeats() {
    const totalFlights = 50;
    const seatsPerFlight = 10;

    for (let flightId = 1; flightId <= totalFlights; flightId++) {
        for (let seatIndex = 1; seatIndex <= seatsPerFlight; seatIndex++) {
            const seatNumber = `S${seatIndex.toString().padStart(2, "0")}`;

            try {
                await pool.query(
                    `INSERT INTO seats (flight_id, seat_number)
           VALUES ($1, $2)
           ON CONFLICT (flight_id, seat_number) DO NOTHING`,
                    [ flightId, seatNumber ]
                );
            } catch (err) {
                console.error(`Error inserting seat for flight ${flightId}, seat ${seatNumber}`, err);
            }
        }
    }

    console.log("✅ Dummy seat data seeded");
}

seedSeats();
