import { applyDiscount } from './DiscountController.js';
import { pool } from '../config/db.js';
import { seedDiscounts } from '../seed/seedDiscounts.js';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('../config/db.js', () => ({
    pool: {
        query: jest.fn()
    }
}));

jest.mock('../seed/seedDiscounts.js', () => ({
    seedDiscounts: jest.fn()
}));

jest.mock('pg', () => {
    const actual = jest.requireActual('pg');
    return {
        ...actual,
        Pool: jest.fn().mockImplementation(() => ({
            query: jest.fn()
        }))
    };
});

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('applyDiscount Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if bookingId or code is missing', async () => {
        const req: any = { body: { bookingId: null, code: null } };
        const res = mockResponse();

        await applyDiscount(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing bookingId or discount code." });
    });

    it('should return 404 if discount code is invalid', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

        const req: any = { body: { bookingId: 'b123', code: 'FAKECODE' } };
        const res = mockResponse();

        await applyDiscount(req, res);

        expect(pool.query).toHaveBeenCalledWith(
            `SELECT * FROM discounts WHERE code = $1 AND is_active = true`,
            [ 'FAKECODE' ]
        );
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired discount code." });
    });

    it('should return 400 if booking not found or not paid', async () => {
        (pool.query as jest.Mock).mockResolvedValue({
            rows: [ { id: 1, code: 'SAVE20', amount: 100 } ]
        });

        const mockBookingPool = {
            query: jest.fn().mockResolvedValue({ rows: [ { status: 'PENDING' } ] })
        };
        (Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

        const req: any = { body: { bookingId: 'b123', code: 'SAVE20' } };
        const res = mockResponse();

        await applyDiscount(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Discount can only be applied after payment." });
    });

    it('should apply discount successfully when conditions are met', async () => {
        const mockDiscount = { id: 1, amount: 500 };
        const mockBooking = { status: 'SUCCESS', price: 2000 };

        (pool.query as jest.Mock).mockResolvedValue({ rows: [ mockDiscount ] });

        const mockBookingPool = {
            query: jest.fn().mockResolvedValue({ rows: [ mockBooking ] })
        };
        (Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

        const req: any = { body: { bookingId: 'b123', code: 'SAVE50' } };
        const res = mockResponse();

        await applyDiscount(req, res);

        expect(res.json).toHaveBeenCalledWith({
            message: "Discount applied",
            finalAmount: 1500
        });
    });
});
