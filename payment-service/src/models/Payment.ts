export interface Payment {
    id?: number;
    booking_id: number;
    amount: number;
    status: "SUCCESS" | "FAILED";
    transaction_id: string;
}
