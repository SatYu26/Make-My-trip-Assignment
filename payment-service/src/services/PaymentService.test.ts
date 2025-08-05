import { PaymentService } from './PaymentService.js';
import { pool } from '../config/db.js';
import { Pool } from 'pg';

jest.mock('../config/db.js', () => ({
	pool: {
		query: jest.fn()
	}
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

describe('PaymentService', () => {
	const mockBookingId = 'booking123';
	const mockUserId = 'user123';
	const mockAmount = 5000;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should process payment successfully', async () => {
		const mockBookingPool = {
			query: jest
				.fn()
				.mockResolvedValueOnce({ rows: [ { id: mockBookingId, user_id: mockUserId } ] }) // booking exists
				.mockResolvedValueOnce({ rows: [] }) // update booking status
		};
		(Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

		(pool.query as jest.Mock)
			.mockResolvedValueOnce({ rows: [] }) // no existing payment
			.mockResolvedValueOnce({}); // insert payment

		const result = await PaymentService.processPayment(mockBookingId, mockUserId, mockAmount);

		expect(result).toEqual({ message: "Payment successful" });
		expect(pool.query).toHaveBeenCalledWith(
			`SELECT * FROM payments WHERE booking_id = $1`,
			[ mockBookingId ]
		);
		expect(pool.query).toHaveBeenCalledWith(
			`INSERT INTO payments (booking_id, user_id, amount, status)
       VALUES ($1, $2, $3, $4)`,
			[ mockBookingId, mockUserId, mockAmount, 'SUCCESS' ]
		);
		expect(mockBookingPool.query).toHaveBeenCalledWith(
			`UPDATE bookings SET status = 'SUCCESS' WHERE id = $1`,
			[ mockBookingId ]
		);
	});

	it('should throw error if booking not found or unauthorized', async () => {
		const mockBookingPool = {
			query: jest.fn().mockResolvedValueOnce({ rows: [] })
		};
		(Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

		await expect(
			PaymentService.processPayment(mockBookingId, mockUserId, mockAmount)
		).rejects.toThrow('Booking not found or not authorized');
	});

	it('should throw error if payment already exists', async () => {
		const mockBookingPool = {
			query: jest.fn().mockResolvedValueOnce({ rows: [ { id: mockBookingId, user_id: mockUserId } ] })
		};
		(Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

		(pool.query as jest.Mock).mockResolvedValueOnce({
			rows: [ { booking_id: mockBookingId } ]
		});

		await expect(
			PaymentService.processPayment(mockBookingId, mockUserId, mockAmount)
		).rejects.toThrow('Payment already made for this booking');
	});
});
