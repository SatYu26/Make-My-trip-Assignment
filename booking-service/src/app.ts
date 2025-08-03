import express from "express";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.get('/health', (_, res) => res.sendStatus(200));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});
