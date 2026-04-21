import { redis } from "./redis";

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

/**
 * Basic Fixed Window Rate Limiter using Redis.
 * @param key The unique key to rate limit on (e.g., IP address).
 * @param options Limit and time window.
 * @returns An object with success status and current usage.
 */
export async function rateLimit(
  key: string,
  options: RateLimitOptions = { limit: 10, windowMs: 60 * 1000 }
): Promise<{ success: boolean; count: number; limit: number; remaining: number }> {
  // Use a minute-level bucket for fixed window
  const currentMinute = Math.floor(Date.now() / options.windowMs);
  const redisKey = `rate-limit:${key}:${currentMinute}`;

  // Atomically increment the counter and set expiry if it's new
  const result = await redis.multi()
    .incr(redisKey)
    .pexpire(redisKey, options.windowMs)
    .exec();

  // result[0][1] is the result of the `incr` command
  const count = result?.[0]?.[1] as number || 1;

  return {
    success: count <= options.limit,
    count,
    limit: options.limit,
    remaining: Math.max(0, options.limit - count),
  };
}
