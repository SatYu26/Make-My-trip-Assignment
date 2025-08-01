import express from "express";
import bookingRoutes from "./routes/bookingRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});
