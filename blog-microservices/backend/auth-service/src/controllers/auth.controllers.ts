import { NextFunction, Request, Response } from "express";
import * as authSchema from '../../../shared/src/schema/schemas'
import { UserModel } from "src/models/user.models";
import * as argon2 from "argon2";
import { ApiResponse } from "../../../shared/src/types/types";
import { AuthenticatedRequest } from "../../../shared/src/types/AuthenticatedRequest";
import logger from "../../../shared/src/logger/logger";
import jwt from 'jsonwebtoken'
 


export const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const validateRegister = authSchema.registrationSchema.parse(req.body);
        const {username, email, password} = validateRegister;

        const existingUser = await UserModel.findOne({$or: [{email}, {username}]});

        if(existingUser) {
            throw new Error("Email or username already exists")
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });
        
        // use the toJSON method which will remove the password property
        const userWithoutPassword = newUser.toJSON();

        const response: ApiResponse<{user: typeof userWithoutPassword}> = {
            success: true,
            message: "User registered successfully",
            data: {user: userWithoutPassword}
        }
        res.status(201).json(response);

    } catch (error) {
        logger.error("registrtaion error: ", error)
        next(error)
    }
};


export const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const loginUser = await authSchema.loginSchema.parse(req.body);
        const {email, password} = loginUser;

        const user = await UserModel.findOne({email});
        if(!user){
            throw new Error("Invalid credentials");
        }
        
        const comparePasswords = await argon2.verify(user.password, password);
        if(!comparePasswords){
            throw new Error("Invalid credentials");
        }


        // Generate JWT
        const token = jwt.sign(
            {userId: user._id, username: user.username},
            process.env.JWT_SECRETS!,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } as jwt.SignOptions
        );

        const response: ApiResponse<{token: string}> = {
            success: true,
            message: "Login was successfull",
            data: {token}
        }
        res.status(200).json(response);

    } catch (error) {
        logger.error(`Login error: ${error}`);
        next(error);
    }
}


export const getCurrentUser = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(req.user.userId).select('-password');
        if(!user) {
            throw new Error("User not found")
        };

        const response: ApiResponse<{ user: typeof user}> = {
            success: true,
            message: "Welcome",
            data: {user}
        }
        res.status(200).json(response)
    } catch (error) {
        logger.error(`Get current user error: ${error}`);
    next(error);
    }
}