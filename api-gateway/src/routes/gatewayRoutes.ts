import express from "express";
import axios from "axios";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

const forward = async (req: any, res: any, url: string) => {
    try {
        const response = await axios({
            method: req.method,
            url,
            data: req.body,
            headers: {
                Authorization: req.headers.authorization,
                "Content-Type": "application/json",
                "x-user-id": req.user.userId,
            },
        });
        res.status(response.status).json(response.data);
    } catch (err: any) {
        res.status(err?.response?.status || 500).json(err?.response?.data || { error: "Upstream error" });
    }
};

router.use(authenticate);

// Example: Forward search request
router.get("/flights/search", (req, res) =>
    forward(req, res, `${process.env.FLIGHT_SEARCH_URL}/api/flights/search`)
);

// Lock seats
router.post("/seats/lock", (req, res) =>
    forward(req, res, `${process.env.SEAT_SERVICE_URL}/api/seats/lock`)
);

// Booking
router.post("/booking/create", (req, res) =>
    forward(req, res, `${process.env.BOOKING_SERVICE_URL}/api/book`)
);

// Payment
router.post("/payment/charge", (req, res) =>
    forward(req, res, `${process.env.PAYMENT_SERVICE_URL}/api/pay`)
);

// Discount (optional step)
router.post("/discount/apply", (req, res) =>
    forward(req, res, `${process.env.DISCOUNT_SERVICE_URL}/api/discount/apply`)
);

// Ticket
router.post("/ticket/generate", (req, res) =>
    forward(req, res, `${process.env.TICKET_SERVICE_URL}/api/ticket`)
);

// Notification
router.post("/notify", (req, res) =>
    forward(req, res, `${process.env.NOTIFICATION_SERVICE_URL}/api/notify`)
);

export default router;
