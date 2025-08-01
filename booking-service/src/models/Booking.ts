export interface Passenger {
    name: string;
    age: number;
    email: string;
    seat_number: string;
}

export interface Booking {
    id?: number;
    user_id: string;
    flight_id: number;
    passengers: Passenger[];
    status?: "PENDING" | "CONFIRMED" | "FAILED";
    total_amount: number;
}
