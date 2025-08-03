import express from "express";
import bodyParser from "body-parser";
import NotificationController from "./controllers/NotificationController.js";

const app = express();
app.use(bodyParser.json());
app.use("/api/notifications", NotificationController);
app.get('/health', (_, res) => res.sendStatus(200));
export default app;
