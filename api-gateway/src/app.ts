import express from "express";
import dotenv from "dotenv";
import router from "./routes/gatewayRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);

export default app;
