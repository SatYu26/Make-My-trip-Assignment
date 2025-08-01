import { Request, Response } from "express";
import { FlightSearchService } from "../services/FlightSearchService";

const service = new FlightSearchService();
await service.initGraph();

export class FlightController {
    static async searchFlights(req: Request, res: Response) {
        const { src, dest } = req.query;
        if (!src || !dest) return res.status(400).json({ error: "Missing src or dest" });

        const paths = await service.findPaths(String(src), String(dest));
        return res.json({ paths });
    }

    static async directFlights(req: Request, res: Response) {
        const { src, dest } = req.query;
        const flights = await service.getFlightsBetween(String(src), String(dest));
        return res.json({ flights });
    }
}
