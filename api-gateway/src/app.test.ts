import request from 'supertest';
import app from './app';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
test('mock axios works', () => {
    expect(jest.isMockFunction(axios.request)).toBe(true);
});

const createMockResponse = (data: any, status = 200, url = 'mock-url') => ({
    status,
    statusText: 'OK',
    data,
    headers: {},
    config: { url },
});

beforeEach(() => {
    jest.clearAllMocks();
});
describe('API Gateway Routing', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should route /auth/login to AuthService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ token: 'abc123' }, 200, 'http://auth-service/api/auth/login')
        );

        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'test', password: 'test' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ token: 'abc123' });
    });

    it('should route /flights/search to FlightSearchService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse([ { flight: 'XY123' } ], 200, 'http://flight-search/api/flights/search')
        );

        const res = await request(app)
            .get('/api/flights/search')
            .query({ source: 'DEL', destination: 'BOM', date: '2025-08-05' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual([ { flight: 'XY123' } ]);
    });

    it('should route /seats/lock to SeatService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ locked: true }, 200, 'http://seat-service/api/seats/lock')
        );

        const res = await request(app)
            .post('/api/seats/lock')
            .send({ seatNumber: 'A1', userId: 'user123' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ locked: true });
    });

    it('should route /bookings/create to BookingService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ bookingId: 'b123' }, 201, 'http://booking-service/api/bookings')
        );

        const res = await request(app)
            .post('/api/bookings/create')
            .send({ flightId: 'f123', userId: 'u456' });

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ bookingId: 'b123' });
    });

    it('should route /payments/pay to PaymentService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ message: 'Payment successful' }, 200, 'http://payment-service/api/payments/pay')
        );

        const res = await request(app)
            .post('/api/payments/pay')
            .send({ bookingId: 'b123', amount: 5000 });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Payment successful' });
    });

    it('should route /discounts/apply to DiscountService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ discount: 500 }, 200, 'http://discount-service/api/discounts/apply')
        );

        const res = await request(app)
            .post('/api/discounts/apply')
            .send({ bookingId: 'b123', code: 'SAVE500' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ discount: 500 });
    });

    it('should route /tickets/generate to TicketService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ ticketId: 't123' }, 201, 'http://ticket-service/api/tickets/generate')
        );

        const res = await request(app)
            .post('/api/tickets/generate')
            .send({ booking_id: 'b123' });

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ ticketId: 't123' });
    });

    it('should route /notifications/send to NotificationService', async () => {
        mockedAxios.request.mockResolvedValueOnce(
            createMockResponse({ status: 'sent' }, 200, 'http://notification-service/api/notifications/send')
        );

        const res = await request(app)
            .post('/api/notifications/send')
            .send({ userId: 'u123', message: 'Hi!' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: 'sent' });
    });

    it('should return 503 if upstream service returns error', async () => {
        mockedAxios.request.mockRejectedValueOnce({
            response: {
                status: 503,
                data: { error: 'Service unavailable' },
                headers: {},
                config: { url: 'http://auth-service/api/auth/login' },
                statusText: 'Service Unavailable',
            },
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'test', password: 'test' });

        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Service unavailable' });
    });

    it('should return 500 if axios throws without response', async () => {
        mockedAxios.request.mockRejectedValueOnce(new Error('Unexpected failure'));

        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'test', password: 'test' });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Upstream error' });
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
});
