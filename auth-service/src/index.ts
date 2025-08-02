import app from "./app.js";
import { pool } from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
  });
}

startServer();
