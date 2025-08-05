import { BookingService } from './BookingService.js';
import { pool } from '../config/db.js';

jest.mock('../config/db.js', () => ({
	pool: {
		query: jest.fn()
	}
}));

describe('BookingService', () => {
	const mockBooking = {
		id: 'booking123',
		user_id: 'user123',
		flight_id: 'flight456',
		seats: 2,
		price: 5000,
		status: 'PENDING'
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new booking and return the created booking', async () => {
		(pool.query as jest.Mock).mockResolvedValue({ rows: [ mockBooking ] });

		const bookingData = {
			userId: 'user123',
			flightId: 'flight456',
			seats: 2,
			price: 5000
		};

		const result = await BookingService.createBooking(bookingData);

		expect(pool.query).toHaveBeenCalledWith(
			`INSERT INTO bookings (user_id, flight_id, seats, price, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
			[ 'user123', 'flight456', 2, 5000, 'PENDING' ]
		);

		expect(result).toEqual(mockBooking);
	});

	it('should fetch a booking by bookingId and userId', async () => {
		(pool.query as jest.Mock).mockResolvedValue({ rows: [ mockBooking ] });

		const result = await BookingService.getBooking('booking123', 'user123');

		expect(pool.query).toHaveBeenCalledWith(
			`SELECT * FROM bookings WHERE id = $1 AND user_id = $2`,
			[ 'booking123', 'user123' ]
		);

		expect(result).toEqual(mockBooking);
	});

	it('should return undefined if booking not found', async () => {
		(pool.query as jest.Mock).mockResolvedValue({ rows: [] });

		const result = await BookingService.getBooking('missing', 'user123');

		expect(result).toBeUndefined();
	});

	it('should throw error if DB fails during createBooking', async () => {
		(pool.query as jest.Mock).mockRejectedValue(new Error('DB error'));

		await expect(
			BookingService.createBooking({
				userId: 'user123',
				flightId: 'flight456',
				seats: 2,
				price: 5000
			})
		).rejects.toThrow('DB error');
	});

	it('should throw error if DB fails during getBooking', async () => {
		(pool.query as jest.Mock).mockRejectedValue(new Error('DB error'));

		await expect(BookingService.getBooking('booking123', 'user123')).rejects.toThrow('DB error');
	});

	it('should ensure status is PENDING when creating booking', async () => {
		(pool.query as jest.Mock).mockResolvedValue({ rows: [ mockBooking ] });

		await BookingService.createBooking({
			userId: 'user123',
			flightId: 'flight456',
			seats: 2,
			price: 5000
		});

		const [ [ , , , , status ] ] = (pool.query as jest.Mock).mock.calls[ 0 ][ 1 ];
		expect(status).toBe('PENDING');
	});

	it('should return a booking with expected keys', async () => {
		(pool.query as jest.Mock).mockResolvedValue({ rows: [ mockBooking ] });

		const result = await BookingService.createBooking({
			userId: 'user123',
			flightId: 'flight456',
			seats: 2,
			price: 5000
		});

		expect(result).toHaveProperty('id');
		expect(result).toHaveProperty('user_id');
		expect(result).toHaveProperty('flight_id');
		expect(result).toHaveProperty('seats');
		expect(result).toHaveProperty('price');
		expect(result).toHaveProperty('status');
	});
});
