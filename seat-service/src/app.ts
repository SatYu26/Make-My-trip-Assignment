import express from "express";
import seatRoutes from "./routes/seatRoutes.js";
import healthRoutes from "./routes/healthCheck.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", healthRoutes);
app.use("/api/seats", seatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Seat Service running on port ${PORT}`);
});
