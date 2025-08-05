const request = require('supertest');
const app = require('./app');

describe('API Gateway', () => {
    it('should route to the AuthService', async () => {
        const response = await request(app).post('/auth/login').send({ username: 'test', password: 'test' });
        expect(response.status).toBe(200);
    });

    it('should route to the BookingService', async () => {
        const response = await request(app).post('/booking/create').send({ flightId: '123', userId: '456' });
        expect(response.status).toBe(201);
    });

    it('should route to the DiscountService', async () => {
        const response = await request(app).get('/discount/123');
        expect(response.status).toBe(200);
    });

    it('should route to the FlightSearchService', async () => {
        const response = await request(app).get('/flights/search').query({ from: 'NYC', to: 'LAX' });
        expect(response.status).toBe(200);
    });

    it('should route to the NotificationService', async () => {
        const response = await request(app).post('/notifications/send').send({ userId: '456', message: 'Hello' });
        expect(response.status).toBe(200);
    });

    it('should route to the PaymentService', async () => {
        const response = await request(app).post('/payment/process').send({ amount: 100, userId: '456' });
        expect(response.status).toBe(200);
    });

    it('should route to the SeatService', async () => {
        const response = await request(app).get('/seats/availability').query({ flightId: '123' });
        expect(response.status).toBe(200);
    });

    it('should route to the TicketService', async () => {
        const response = await request(app).post('/tickets/create').send({ bookingId: '789' });
        expect(response.status).toBe(201);
    });
});