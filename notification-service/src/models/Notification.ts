export interface NotificationRequest {
    to: string;
    type: "EMAIL" | "SMS";
    subject?: string;
    message: string;
}
