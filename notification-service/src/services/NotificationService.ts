import { NotificationRequest } from "../models/Notification";

export class NotificationService {
    async send(notification: NotificationRequest): Promise<{ status: string }> {
        // Simulate delivery delay
        await new Promise(res => setTimeout(res, 500));

        console.log(`📨 Sending ${notification.type} to ${notification.to}`);
        console.log(`Subject: ${notification.subject || "No subject"}`);
        console.log(`Message: ${notification.message}`);

        return { status: "DELIVERED" };
    }
}
