import Redis from "ioredis";

// Reuse the Redis connection in development to prevent hot-reload exhaustion
const globalForRedis = global as unknown as { redis: Redis };

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;

export const redis =
  globalForRedis.redis ||
  new Redis({
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: 5,
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
