import Redis from 'ioredis';
import dotenv from 'dotenv';
import logger from '../../../shared/src/logger/logger';
import { RateLimiterRedis } from 'rate-limiter-flexible';
dotenv.config();
const redisClient = new Redis(process.env.REDIS_URL);
redisClient.on("error", (error) => {
    logger.error("Redis error: ", error);
});
const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    duration: parseInt(process.env.RATE_LIMIT_WINDOWS_MS || '900000') // 15 Minutes
});
// export const rateLimiterMiddleware = (req: Request, res: Response, next:NextFunction) =>{
//     rateLimiter.consume(req.ip || 'unknown-ip').then(() => {
//         next();
//     }).catch(()=> {
//         res.status(429).json({
//             success: false,
//             message: "Too many requests"
//         }),
//         next();
//     })
// }
export const rateLimiterMiddleware = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip || 'unknown-ip');
        next();
    }
    catch (error) {
        res.status(429).json({
            success: false,
            message: "Too many requests"
        }),
            console.log(error);
    }
};
