import { SeatService } from './SeatService.js';
import { pool } from '../config/db.js';
import { redisClient } from '../config/redis.js';
import { seedSeats } from '../seed/seedSeats.js';
import { invalidateCache } from '../utils/cacheUtils.js';

jest.mock('../config/db.js', () => ({
    pool: {
        query: jest.fn()
    }
}));

jest.mock('../config/redis.js', () => ({
    redisClient: {
        get: jest.fn(),
        setEx: jest.fn()
    }
}));

jest.mock('../seed/seedSeats.js', () => ({
    seedSeats: jest.fn()
}));

jest.mock('../utils/cacheUtils.js', () => ({
    invalidateCache: jest.fn()
}));

describe('SeatService', () => {
    const flightId = 123;
    const seatNumber = 'A1';
    const userId = 'user42';
    const availableSeats = [ 'A1', 'A2', 'A3' ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAvailableSeats', () => {
        it('should return cached seats if present', async () => {
            (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(availableSeats));

            const result = await SeatService.getAvailableSeats(flightId);

            expect(seedSeats).toHaveBeenCalled();
            expect(redisClient.get).toHaveBeenCalledWith(`seats:${flightId}`);
            expect(result).toEqual(availableSeats);
            expect(pool.query).not.toHaveBeenCalled();
            expect(redisClient.setEx).not.toHaveBeenCalled();
        });

        it('should query DB and cache seats if cache is missed', async () => {
            (redisClient.get as jest.Mock).mockResolvedValue(null);
            (pool.query as jest.Mock).mockResolvedValue({ rows: availableSeats.map(s => ({ seat_number: s })) });

            const result = await SeatService.getAvailableSeats(flightId);

            expect(seedSeats).toHaveBeenCalled();
            expect(redisClient.get).toHaveBeenCalledWith(`seats:${flightId}`);
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT seat_number FROM seats WHERE flight_id = $1 AND is_booked = false",
                [ flightId ]
            );
            expect(redisClient.setEx).toHaveBeenCalledWith(
                `seats:${flightId}`,
                300,
                JSON.stringify(availableSeats)
            );
            expect(result).toEqual(availableSeats);
        });
    });

    describe('lockSeat', () => {
        it('should lock seat and invalidate cache', async () => {
            (pool.query as jest.Mock).mockResolvedValue({}); // no need to mock rows here

            const result = await SeatService.lockSeat(flightId, seatNumber, userId);

            expect(seedSeats).toHaveBeenCalled();
            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE seats SET is_booked = true, booked_by = $1 WHERE flight_id = $2 AND seat_number = $3 AND is_booked = false",
                [ userId, flightId, seatNumber ]
            );
            expect(invalidateCache).toHaveBeenCalledWith(flightId);
            expect(result).toEqual({ flightId, seatNumber });
        });

    });
});
