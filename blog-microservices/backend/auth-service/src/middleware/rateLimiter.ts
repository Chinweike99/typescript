import Redis from 'ioredis'
import dotenv from 'dotenv'
import logger from '../../../shared/src/logger/logger';
import {RateLimiterRedis} from 'rate-limiter-flexible'
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const redisClient = new Redis (process.env.REDIS_URL as string);

redisClient.on("error", (error) => {
    logger.error("Redis error: ", error);
});


const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: parseInt(process.env.RATE_LIMIT_MAX as string || '100'),
    duration: parseInt(process.env.RATE_LIMIT_WINDOWS_MS as string || '900000') // 15 Minutes
});


export const rateLimiterMiddleware = (req: Request, res: Response, next:NextFunction) =>{
    rateLimiter.consume(req.ip || 'unknown-ip').then(() => {
        next();
    }).catch(()=> {
        res.status(429).json({
            success: false,
            message: "Too many requests"
        }),
        next();
    })
}