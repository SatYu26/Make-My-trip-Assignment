import { redis } from '../config/redis.js';

export const getCachedFlights = async (key: string) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
};

export const setCachedFlights = async (key: string, value: any, ttlSeconds = 600) => {
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
};

export const invalidateFlightCache = async (key: string) => {
    await redis.del(key);
};
