import { Request, Response, Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/health", (req: Request, res: Response) => res.sendStatus(200));

// Send notification (dummy)
router.post("/send", authenticate, async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    if (!userId || !message) {
        return res.status(400).json({ error: "Missing userId or message" });
    }

    // Simulate message delivery
    console.log(`Sending notification to user ${userId}: ${message}`);
    res.json({ status: "Notification sent" });
});

export default router;
