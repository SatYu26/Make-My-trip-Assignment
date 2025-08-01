import express from "express";
import flightRoutes from "./routes/flightRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/flights", flightRoutes);

app.listen(PORT, () => {
    console.log(`Flight Search Service running on port ${PORT}`);
});
