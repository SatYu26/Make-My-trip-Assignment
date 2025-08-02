CREATE TABLE IF NOT EXISTS seats (
      id SERIAL PRIMARY KEY,
      flight_id INTEGER NOT NULL,
      seat_number TEXT NOT NULL,
      is_locked BOOLEAN DEFAULT false,
      is_booked BOOLEAN DEFAULT false,
      UNIQUE(flight_id, seat_number)
    );