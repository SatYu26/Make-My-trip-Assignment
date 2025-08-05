import { searchFlights } from './FlightController.js';
import { pool } from '../config/db.js';
import { getCachedFlights, setCachedFlights } from '../utils/cache.js';
import { seed } from '../seed/seedFlights.js';

jest.mock('../config/db.js', () => ({
    pool: {
        query: jest.fn()
    }
}));

jest.mock('../utils/cache.js', () => ({
    getCachedFlights: jest.fn(),
    setCachedFlights: jest.fn()
}));

jest.mock('../seed/seedFlights.js', () => ({
    seed: jest.fn()
}));

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('searchFlights Controller', () => {
    const mockFlights = [
        {
            id: 'f1',
            source: 'DEL',
            destination: 'BOM',
            departure_time: '10:00',
            arrival_time: '12:00',
            date: '2025-08-05',
            flight_number: 'AI123'
        }
    ];

    const mockQuery = {
        source: 'DEL',
        destination: 'BOM',
        date: '2025-08-05'
    };

    const uniqueDate = new Date().toISOString().slice(0, 10); // use YYYY-MM-DD
    const mockCacheKey = `flights:${mockQuery.source}-${mockQuery.destination}-${uniqueDate}`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return flights from cache if available', async () => {
        (getCachedFlights as jest.Mock).mockResolvedValue(mockFlights);

        const req: any = { query: mockQuery };
        const res = mockResponse();

        await searchFlights(req, res);

        expect(getCachedFlights).toHaveBeenCalledWith(mockCacheKey);
        expect(pool.query).not.toHaveBeenCalled();
        expect(seed).not.toHaveBeenCalled();
        expect(setCachedFlights).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockFlights);
    });

    it('should fetch flights from DB and cache them when cache is missed', async () => {
        (getCachedFlights as jest.Mock).mockResolvedValue(null);
        (pool.query as jest.Mock).mockResolvedValue({ rows: mockFlights });

        const req: any = { query: mockQuery };
        const res = mockResponse();

        await searchFlights(req, res);

        expect(getCachedFlights).toHaveBeenCalledWith(mockCacheKey);
        expect(seed).toHaveBeenCalled();
        expect(pool.query).toHaveBeenCalledWith(
            `
      SELECT id, source, destination, departure_time, arrival_time, date, flight_number
      FROM flights
      WHERE source = $1 AND destination = $2 AND date = $3 AND is_cancelled = false
    `,
            [ mockQuery.source, mockQuery.destination, mockQuery.date ]
        );
        expect(setCachedFlights).toHaveBeenCalledWith(mockCacheKey, mockFlights);
        expect(res.json).toHaveBeenCalledWith(mockFlights);
    });
});
