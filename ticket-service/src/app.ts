import express from "express";
import dotenv from "dotenv";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tickets", ticketRoutes);
app.get("/health", (_, res) => res.sendStatus(200));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Ticket service running on port ${PORT}`);
});
