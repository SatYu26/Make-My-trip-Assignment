import express from "express";
import discountRoutes from "./routes/discountRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/discounts", discountRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Discount Service running on port ${PORT}`);
});
