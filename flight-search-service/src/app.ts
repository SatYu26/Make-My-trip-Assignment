import express from 'express';
import flightRoutes from './routes/flightRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/flights', flightRoutes);

app.get('/health', (_, res) => res.sendStatus(200));

app.listen(4000, () => console.log('Flight Search Service running on port 4000'));
