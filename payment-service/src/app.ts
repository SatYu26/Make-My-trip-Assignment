import express from "express";
import paymentRoutes from "./routes/paymentRoutes.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
dotenv.config();
await connectToDB();
const app = express();
app.use(express.json());
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});
