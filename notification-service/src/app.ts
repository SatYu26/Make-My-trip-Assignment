import express from "express";
import bodyParser from "body-parser";
import NotificationController from "./controllers/NotificationController.js";

const app = express();
app.use(bodyParser.json());
app.use("/api/notifications", NotificationController);

export default app;
