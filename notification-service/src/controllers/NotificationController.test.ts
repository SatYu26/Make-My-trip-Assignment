import express, { Express } from 'express';
import request from 'supertest';
import notificationRouter from './NotificationController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

jest.mock('../middlewares/authMiddleware.js', () => ({
	authenticate: jest.fn((req, res, next) => next())
}));

let app: Express;

beforeEach(() => {
	app = express();
	app.use(express.json());
	app.use('/notification', notificationRouter);
});

describe('NotificationController', () => {
	it('should respond with 200 on /health', async () => {
		const res = await request(app).get('/notification/health');
		expect(res.status).toBe(200);
	});

	it('should send notification successfully', async () => {
		const res = await request(app)
			.post('/notification/send')
			.send({ userId: 'user123', message: 'Hello world' });

		expect(res.status).toBe(200);
		expect(res.body).toEqual({ status: 'Notification sent' });
	});

	it('should return 400 for missing userId', async () => {
		const res = await request(app)
			.post('/notification/send')
			.send({ message: 'Hello' });

		expect(res.status).toBe(400);
		expect(res.body).toEqual({ error: 'Missing userId or message' });
	});

	it('should return 400 for missing message', async () => {
		const res = await request(app)
			.post('/notification/send')
			.send({ userId: 'user123' });

		expect(res.status).toBe(400);
		expect(res.body).toEqual({ error: 'Missing userId or message' });
	});

	it('should call authenticate middleware', async () => {
		const spy = jest.spyOn(authMiddleware, 'authenticate');

		await request(app)
			.post('/notification/send')
			.send({ userId: 'user123', message: 'Hi!' });

		expect(spy).toHaveBeenCalled();
	});
});
