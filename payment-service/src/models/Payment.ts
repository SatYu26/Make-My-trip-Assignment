export interface Payment {
    id?: number;
    booking_id: number;
    amount: number;
    status: "SUCCESS" | "FAILED";
    user_id: number;
}
