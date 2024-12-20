import Redis from "ioredis";

const redisConfig = {
    
    port: Number(process.env.REDIS_PORT) || 6379,
  };
  
export const redisClient = new Redis(redisConfig);