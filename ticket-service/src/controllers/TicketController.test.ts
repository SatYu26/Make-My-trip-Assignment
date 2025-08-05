import express from 'express';
import request from 'supertest';
import { TicketController } from './TicketController.js';
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

const createAppWithRoutes = () => {
    const app = express();
    app.use(express.json());
    app.post('/tickets', TicketController.generateTicket);
    app.get('/tickets/:id', TicketController.getTicket);
    return app;
};

describe('TicketController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('generateTicket', () => {
        const bookingId = 'booking123';
        const booking = {
            id: bookingId,
            user_id: 'user123',
            flight_id: 'flight789',
            seats: 'A1',
            price: 5000
        };
        const ticket = {
            id: 'ticket456',
            booking_id: bookingId,
            user_id: booking.user_id,
            flight_id: booking.flight_id,
            seat_number: booking.seats,
            price: booking.price
        };

        it('should return 400 if booking_id is missing', async () => {
            const app = createAppWithRoutes();
            const res = await request(app).post('/tickets').send({});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: 'Missing booking_id' });
        });

        it('should return 404 if booking is not found', async () => {
            const app = createAppWithRoutes();
            const mockBookingPool = { query: jest.fn().mockResolvedValue({ rows: [] }) };
            (Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

            const res = await request(app).post('/tickets').send({ booking_id: bookingId });

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ message: 'Booking not found' });
        });

        it('should create a ticket successfully', async () => {
            const app = createAppWithRoutes();

            const mockBookingPool = { query: jest.fn().mockResolvedValue({ rows: [ booking ] }) };
            (Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

            (pool.query as jest.Mock).mockResolvedValue({ rows: [ ticket ] });

            const res = await request(app).post('/tickets').send({ booking_id: bookingId });

            expect(res.status).toBe(201);
            expect(res.body).toEqual(ticket);
        });

        it('should return 500 on DB failure', async () => {
            const app = createAppWithRoutes();

            const mockBookingPool = { query: jest.fn().mockRejectedValue(new Error('DB fail')) };
            (Pool as unknown as jest.Mock).mockImplementation(() => mockBookingPool);

            const res = await request(app).post('/tickets').send({ booking_id: bookingId });

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Internal server error' });
        });
    });

    describe('getTicket', () => {
        const ticketId = 'ticket456';
        const ticket = {
            id: ticketId,
            booking_id: 'booking123',
            user_id: 'user123',
            flight_id: 'flight789',
            seat_number: 'A1',
            price: 5000
        };

        it('should return ticket if found', async () => {
            const app = createAppWithRoutes();
            (pool.query as jest.Mock).mockResolvedValue({ rows: [ ticket ] });

            const res = await request(app).get(`/tickets/${ticketId}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(ticket);
        });

        it('should return 404 if ticket is not found', async () => {
            const app = createAppWithRoutes();
            (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

            const res = await request(app).get(`/tickets/${ticketId}`);

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ message: 'Ticket not found' });
        });

        it('should return 500 on DB error', async () => {
            const app = createAppWithRoutes();
            (pool.query as jest.Mock).mockRejectedValue(new Error('DB Error'));

            const res = await request(app).get(`/tickets/${ticketId}`);

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Internal server error' });
        });
    });
});
