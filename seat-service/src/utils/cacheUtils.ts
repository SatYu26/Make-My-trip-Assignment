import { redisClient } from "../config/redis.js";

export async function invalidateCache(flightId: number) {
    await redisClient.del(`seats:${flightId}`);
}
