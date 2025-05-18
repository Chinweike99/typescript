import { getTokenFromHeader, verifyToken } from "../../../shared/src/utils/utils";
import logger from "../../../shared/src/logger/logger";
export const authenticate = (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            throw new Error("Authentication error, No token provided");
        }
        ;
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        logger.error(`Authentication error: ${error}`);
        next(new Error('Invalid or expired token'));
    }
};
