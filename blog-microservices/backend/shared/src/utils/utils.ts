import { AuthPayload } from "../types/types";
import {Request} from 'express';
import jwt from 'jsonwebtoken';


export const getTokenFromHeader = (req: Request): string | null => {
    const authHeader = req.headers['authorization'];
    if(authHeader && authHeader.startsWith("Bearer ")){
        return authHeader.split(" ")[1];
    };
    return null
}

export const verifyToken = (token: string, secret: string): AuthPayload => {
    return jwt.verify(token, secret) as AuthPayload;
}

