export interface Seat {
    id: number;
    flight_id: number;
    seat_number: string;
    status: "available" | "locked" | "booked";
}
