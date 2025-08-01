export interface Ticket {
    booking_id: number;
    user_id: string;
    flight_id: number;
    total_amount: number;
    passengers: {
        name: string;
        age: number;
        email: string;
        seat_number: string;
    }[];
    status: "CONFIRMED" | "PENDING" | "FAILED";
}
