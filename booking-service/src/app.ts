import express from "express";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
dotenv.config();
await connectToDB();
const app = express();
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});
