import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = createClient({ url: redisUrl })
  .on('error', err => console.log('Redis Client Error', err));

(async () => {
    if (!redis.isOpen) {
      await redis.connect();
    }
})();

await redis.set('name', 'hrushi');
const value = await redis.get('name');
console.log(`name : ${value}`)
await redis.del('name')

// queue

await redis.rPush("queue:1", "task:1");
await redis.rPush("queue:1", "task:2");
await redis.rPush("queue:1", "task:3");
const poppedValue = await redis.lPop("queue:1");
console.log("popped value", poppedValue)
await redis.disconnect();