import {Request, Response, NextFunction} from 'express'
import logger from '../logger/logger';


export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational: boolean = true
    ){
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err.message, {stack: err.stack});
    if(err instanceof AppError ){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    
    // Handle Other types o errors
    return res.status(500).json({
        succes: false,
        message: "Internal server error"
    })
};


export const notFoundHandler = (req: Request, res: Response, next: NextFunction)=>{
    const error = new AppError(404, `Not found - ${req.originalUrl}`);
    next(error);
}
