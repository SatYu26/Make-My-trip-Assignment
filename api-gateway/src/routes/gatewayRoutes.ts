import express from "express";
import axios from "axios";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

const forward = async (req: any, res: any, url: string) => {
    try {
        console.log(`Forwarding request to: ${url}`);
        const response = await axios.request({
            method: req.method,
            url,
            data: req.body,
            headers: {
                Authorization: req.headers.authorization || "",
                "Content-Type": "application/json",
                ...(req.user?.userId && { "x-user-id": req.user.userId }),
            },
        });
        res.status(response.status).json(response.data);
    } catch (err: any) {
        res.status(err?.response?.status || 500).json(err?.response?.data || { error: "Upstream error" });
    }
};

router.post("/auth/signup", (req, res) =>
    forward(req, res, `${process.env.AUTH_SERVICE_URL}/api/auth/signup`)
);
router.post("/auth/login", (req, res) =>
    forward(req, res, `${process.env.AUTH_SERVICE_URL}/api/auth/login`)
);

router.use(authenticate);

// Example: Forward search request
router.get("/flights/search", (req, res) =>
    forward(req, res, `${process.env.FLIGHT_SEARCH_URL}/api/flights/search`)
);

// Lock seats
router.post("/seats/lock", (req, res) =>
    forward(req, res, `${process.env.SEAT_SERVICE_URL}/api/seats/lock`)
);

router.get("/seats/:flightId", (req, res) =>
    forward(req, res, `${process.env.SEAT_SERVICE_URL}/api/seats/${req.params.flightId}`)
);

// Booking
router.post("/bookings/create", (req, res) =>
    forward(req, res, `${process.env.BOOKING_SERVICE_URL}/api/bookings`)
);
router.get("/bookings/:Id/:userId", (req, res) =>
    forward(req, res, `${process.env.BOOKING_SERVICE_URL}/api/bookings/${req.params.Id}/${req.params.userId}`)
);

// Payment
router.post("/payments/pay", (req, res) =>
    forward(req, res, `${process.env.PAYMENT_SERVICE_URL}/api/payments/pay`)
);

// Discount (optional step)
router.post("/discounts/apply", (req, res) =>
    forward(req, res, `${process.env.DISCOUNT_SERVICE_URL}/api/discounts/apply`)
);

// Ticket
router.post("/tickets/generate", (req, res) =>
    forward(req, res, `${process.env.TICKET_SERVICE_URL}/api/tickets/generate`)
);
router.get("/tickets/:Id", (req, res) =>
    forward(req, res, `${process.env.TICKET_SERVICE_URL}/api/tickets/${req.params.Id}`)
);

// Notification
router.post("/notifications/send", (req, res) =>
    forward(req, res, `${process.env.NOTIFICATION_SERVICE_URL}/api/notifications/send`)
);

export default router;
