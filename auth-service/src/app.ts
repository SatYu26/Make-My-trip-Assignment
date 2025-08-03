import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get('/health', (_, res) => res.sendStatus(200));

export default app;
