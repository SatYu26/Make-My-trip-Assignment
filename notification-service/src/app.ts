import express from "express";
import notificationRoutes from "./routes/notificationRoutes";

const app = express();
app.use(express.json());
app.use("/api/notify", notificationRoutes);

const PORT = process.env.PORT || 9100;
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
