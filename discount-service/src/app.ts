import express from "express";
import discountRoutes from "./routes/discountRoutes.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
dotenv.config();
await connectToDB();
const app = express();
app.use(express.json());
app.use("/api/discounts", discountRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Discount Service running on port ${PORT}`);
});
