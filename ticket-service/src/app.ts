import express from "express";
import ticketRoutes from "./routes/ticketRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Ticket Service running on port ${PORT}`);
});
