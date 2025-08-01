import { pool } from "../config/db";
import { Flight } from "../models/Flight";
import { FlightGraph } from "../utils/Graph";

export class FlightSearchService {
    private graph = new FlightGraph();

    async initGraph(): Promise<void> {
        const result = await pool.query("SELECT * FROM flights");
        result.rows.forEach((flight: Flight) => {
            this.graph.addEdge(flight.source, flight.destination);
        });
    }

    async findPaths(source: string, destination: string): Promise<string[][]> {
        return this.graph.getPaths(source, destination, 2); // Max 2 hops
    }

    async getFlightsBetween(source: string, destination: string): Promise<Flight[]> {
        const result = await pool.query(
            "SELECT * FROM flights WHERE source = $1 AND destination = $2",
            [ source, destination ]
        );
        return result.rows;
    }
}
