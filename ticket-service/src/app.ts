import express from "express";
import ticketRoutes from "./routes/ticketRoutes.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
dotenv.config();
await connectToDB();
const app = express();
app.use(express.json());
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Ticket Service running on port ${PORT}`);
});
