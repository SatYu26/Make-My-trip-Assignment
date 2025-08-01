import { pool } from "../config/db.js";

const dummyFlights = [
    [ "DEL", "BOM", "10:00", "12:00", "AI101" ],
    [ "BOM", "BLR", "13:00", "15:00", "AI102" ],
    [ "DEL", "HYD", "11:00", "13:30", "AI103" ],
    [ "HYD", "BLR", "14:00", "16:00", "AI104" ],
    [ "DEL", "BLR", "06:00", "08:30", "AI105" ],
];

async function seed() {
    await pool.query(`CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_time TEXT,
    arrival_time TEXT,
    flight_number TEXT UNIQUE
  )`);

    for (const [ src, dest, dep, arr, num ] of dummyFlights) {
        await pool.query(
            `INSERT INTO flights (source, destination, departure_time, arrival_time, flight_number)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (flight_number) DO NOTHING`,
            [ src, dest, dep, arr, num ]
        );
    }

    console.log("Flights seeded");
    process.exit();
}

seed();
