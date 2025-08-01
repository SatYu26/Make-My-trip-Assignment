import { pool } from "../config/db.js";

const dummyFlights = [
    [ "DEL", "BOM", "10:00", "12:00", "AI101" ],
    [ "BOM", "BLR", "13:00", "15:00", "AI102" ],
    [ "DEL", "HYD", "11:00", "13:30", "AI103" ],
    [ "HYD", "BLR", "14:00", "16:00", "AI104" ],
    [ "DEL", "BLR", "06:00", "08:30", "AI105" ],
    [ "BLR", "DEL", "09:00", "11:30", "AI106" ],
    [ "DEL", "MAA", "08:00", "10:15", "AI107" ],
    [ "MAA", "BLR", "11:00", "12:00", "AI108" ],
    [ "DEL", "CCU", "07:00", "09:30", "AI109" ],
    [ "CCU", "HYD", "10:00", "12:30", "AI110" ],
    [ "HYD", "MAA", "13:00", "14:30", "AI111" ],
    [ "MAA", "DEL", "15:00", "17:00", "AI112" ],
    [ "BLR", "CCU", "06:00", "08:30", "AI113" ],
    [ "CCU", "DEL", "09:00", "11:30", "AI114" ],
    [ "BOM", "HYD", "12:00", "14:30", "AI115" ],
    [ "HYD", "BOM", "15:00", "17:00", "AI116" ],
    [ "BLR", "BOM", "18:00", "20:00", "AI117" ],
    [ "BOM", "DEL", "21:00", "23:00", "AI118" ],
    [ "DEL", "PNQ", "06:30", "08:30", "AI119" ],
    [ "PNQ", "DEL", "09:30", "11:30", "AI120" ],
    [ "DEL", "GOI", "12:00", "14:30", "AI121" ],
    [ "GOI", "BOM", "15:00", "17:00", "AI122" ],
    [ "BOM", "MAA", "17:30", "19:30", "AI123" ],
    [ "MAA", "BOM", "20:00", "22:00", "AI124" ],
    [ "CCU", "BOM", "06:00", "08:30", "AI125" ],
    [ "BOM", "CCU", "09:00", "11:30", "AI126" ],
    [ "BLR", "PNQ", "12:00", "14:00", "AI127" ],
    [ "PNQ", "HYD", "15:00", "16:30", "AI128" ],
    [ "HYD", "CCU", "17:00", "19:30", "AI129" ],
    [ "DEL", "IXC", "06:00", "08:00", "AI130" ],
    [ "IXC", "DEL", "09:00", "11:00", "AI131" ],
    [ "BOM", "IXC", "12:00", "14:30", "AI132" ],
    [ "IXC", "BOM", "15:00", "17:30", "AI133" ],
    [ "DEL", "JAI", "07:00", "08:30", "AI134" ],
    [ "JAI", "DEL", "09:00", "10:30", "AI135" ],
    [ "BLR", "JAI", "11:00", "13:30", "AI136" ],
    [ "JAI", "BLR", "14:00", "16:30", "AI137" ],
    [ "HYD", "GOI", "17:00", "18:30", "AI138" ],
    [ "GOI", "HYD", "19:00", "20:30", "AI139" ],
    [ "MAA", "IXC", "06:00", "08:30", "AI140" ],
    [ "IXC", "MAA", "09:00", "11:30", "AI141" ],
    [ "CCU", "JAI", "12:00", "14:30", "AI142" ],
    [ "JAI", "CCU", "15:00", "17:30", "AI143" ],
    [ "DEL", "AMD", "18:00", "20:00", "AI144" ],
    [ "AMD", "DEL", "21:00", "23:00", "AI145" ],
    [ "BOM", "GOI", "06:30", "08:00", "AI146" ],
    [ "GOI", "DEL", "09:00", "11:30", "AI147" ],
    [ "DEL", "CCU", "12:00", "14:30", "AI148" ],
    [ "CCU", "DEL", "15:00", "17:30", "AI149" ],
    [ "DEL", "BLR", "18:00", "20:30", "AI150" ]
];


export async function seed() {
    await pool.query(`CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_time TEXT,
    arrival_time TEXT,
    flight_number TEXT UNIQUE
  )`);

    for (const [ src, dest, dep, arr, num ] of dummyFlights) {
        try {
            await pool.query(
                `INSERT INTO flights (source, destination, departure_time, arrival_time, flight_number)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (flight_number) DO NOTHING`,
                [ src, dest, dep, arr, num ]
            );
        } catch (error) {
            console.error(`Error inserting flight ${num}:`, error);
        }
    }

    console.log("Flights seeded");
    // process.exit();
}

seed();
