import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const proxy = (path: string, target: string) =>
    router.use(path, createProxyMiddleware({ target, changeOrigin: true }));

proxy("/api/auth", process.env.AUTH_SERVICE_URL!);
proxy("/api/flights", process.env.FLIGHT_SEARCH_URL!);
proxy("/api/seats", process.env.SEAT_SERVICE_URL!);
proxy("/api/bookings", process.env.BOOKING_SERVICE_URL!);
proxy("/api/payments", process.env.PAYMENT_SERVICE_URL!);
proxy("/api/discounts", process.env.DISCOUNT_SERVICE_URL!);
proxy("/api/tickets", process.env.TICKET_SERVICE_URL!);
proxy("/api/notify", process.env.NOTIFICATION_SERVICE_URL!);

export default router;
