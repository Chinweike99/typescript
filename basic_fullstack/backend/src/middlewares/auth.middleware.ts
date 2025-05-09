

import dotenv, {config} from 'dotenv'
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.models';

config();


declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
};



export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token;
      
      // 1) Get token from headers or cookies
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }
  
      if (!token) {
        throw new Error('You are not logged in! Please log in to get access.');
      }
  
      // 2) Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
  
      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        throw new Error('The user belonging to this token no longer exists.');
      }
  
      // 4) Grant access to protected route
      req.user = currentUser;
      next();
    } catch (err) {
      next(err);
    }
  };
  
  export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
        throw new Error('You do not have permission to perform this action');
      }
      next();
    };
  };