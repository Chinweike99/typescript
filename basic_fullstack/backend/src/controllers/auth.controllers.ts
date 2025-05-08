import { NextFunction, Request, Response } from "express";
import { emailValidationSchema, loginValidationSchema, resetPasswordValidationSchema, userValidationSchema } from "../models/user.models";
import { createSendToken, forgotPassword, getCurrentUser, loginUser, registerUser, resetPassword, verifyEmail } from "../services/auth.service";




export const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //Validate request
        const validateData = userValidationSchema.parse(req.body);
        const {name, email, password} = validateData;

        // Register User
        const user = await registerUser(name, email, password);
        if(!user){
            res.status(400).json({status: "Fail", message: "Try using another email"})
        }

        res.status(201).json({
            status: "Success",
            message: "Registatraion Successful. Please Check for email verificaion",
            data: {
                user: {
                    id: user?._id,
                    name: user?.name,
                    email: user?.email
                }
            }
        });
        
    } catch (error) {
        next(error);
    }
};


export const verify = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {token} = req.query;
        if(!token || typeof token !== 'string'){
            throw new Error("Invalid verification token");
        }
        
        const user = await verifyEmail(token);
        
        // Check if user exists before accessing properties
        if (user) {
            res.status(200).json({
                status: "Success",
                message: "Email Successfully verified",
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                }
            });
        } else {
            throw new Error("User verification failed");
        }
    } catch (error) {
        next(error);
    }
}



//Login
export const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userDetails = loginValidationSchema.parse(req.body);
        const {email, password} = userDetails;

        const user = await loginUser(email, password);

        // Create a token and set cookie
        const {token, cookieOptions} = createSendToken(user);
        res.cookie('jwt', token, cookieOptions)

        res.status(200).json({
            status: 'success',
            token,
            data: {
              user: {
                id: user._id,
                name: user.name,
                email: user.email
              }
            }
          });      

    } catch (error) {
        next();
    }
}

export const logout = async(req: Request, res: Response)=>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      });
}


export const forgot = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const validateData = emailValidationSchema.parse(req.body);
        const {email} = validateData;

        await forgotPassword(email);

        res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to email'
    });
  } catch (err) {
    next(err);
  }
};




export const reset = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //Validate request body
        const validateaData = resetPasswordValidationSchema.parse(req.body);
        const {token, password} = validateaData;

        const user = await resetPassword(token, password);

        //Create token and set cookie
        const {token: newToken, cookieOptions} = createSendToken(user);

        res.cookie('jwt', newToken, cookieOptions);
        res.status(200).json({
            status: 'success',
            token: newToken,
            message: 'Password reset successful',
            data: {
              user: {
                id: user._id,
                name: user.name,
                email: user.email
              }
            }
          });
    } catch (error) {
        next(error)
    }
}


export const getMe = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const me = await getCurrentUser((req as any).user.id);

        res.status(200).json({
            status: 'success',
            data: {
              user: {
                id: me?._id,
                name: me?.name,
                email: me?.email
              }
            }
          });
        } catch (err) {
          next(err);
        }
      };