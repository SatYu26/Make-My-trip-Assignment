import express from "express";
import flightRoutes from "./routes/flightRoutes.js";
import { connectToDB } from "./config/db.js";
await connectToDB();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/flights", flightRoutes);

app.listen(PORT, () => {
    console.log(`Flight Search Service running on port ${PORT}`);
});
