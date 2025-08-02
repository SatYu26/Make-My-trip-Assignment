CREATE TABLE IF NOT EXISTS flights (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_time TEXT,
  arrival_time TEXT,
  date DATE NOT NULL,
  flight_number TEXT UNIQUE,
  is_cancelled BOOLEAN DEFAULT false
);
