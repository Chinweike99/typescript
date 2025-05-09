import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { IUser } from "../models/user.models";
import argon2  from "argon2";
import crypto from 'crypto';
import { sendPasswordResetEmail, sendVerificationEmail } from "./email.services";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const COOKIE_EXPIRES_IN = parseInt(process.env.COOKIE_EXPIRES_IN || "1", 10);

//create JSON Web Token
export const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const createSendToken = (user: IUser) => {
  try {
    const token = signToken(String(user._id));

    const cookieOptions = {
      expires: new Date(Date.now() + COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
    };
    console.log("Token sent", cookieOptions)
    return { token, cookieOptions };
  } catch (error) {
    throw error
  }
};


export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error("Email already in use");
        };
        const hashedPassword = await argon2.hash(password);

        // Create a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken
        });
        //Send Verification Email
        
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
        }
        

        // await sendVerificationEmail(email, verificationToken);
        return newUser;
    } catch (error) {
        console.log("Registration error: ", error)
        throw error;
    }
}



// Verify Email
export const verifyEmail = async(token: string) => {
    try {
        const user = await User.findOne({verificationToken: token});
        if(!user){
            throw new Error("Invalid verification token")
        };

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        return user
    } catch (error) {
        console.error("Error verifying email", error);
        throw error;
    }
}


// Verify Reset Token
export const verifyResetToken = async (token: string) => {
  try {
    const user = await User.findOne({ 
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      throw new Error("Invalid or expired password reset token");
    }
    
    return user;
  } catch (error) {
    console.error("Error verifying reset token", error);
    throw error;
  }
}



export const loginUser = async(email: string, password: string) => {
    try {
        //Check if user exists
        const userExists = await User.findOne({email}).select("+password");
        if(!userExists){
            throw new Error("User does not exist");
        }

        //Check if password is valid
        const validPassword = await argon2.verify(userExists.password, password);
        if(!validPassword){
            throw new Error("Passoword is not correct");
        }

        //Check if user is verified
        if(!userExists.isVerified){
            throw new Error ("Please verify your email first")
        }
        return userExists;
    } catch (error) {
        console.log("Error Logging in: ", error);
        throw error
    }
}


export const forgotPassword = async(email: string) => {
    try {
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        };

        //Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.passwordResetToken = resetToken;
        user.passwordResetExpires = passwordResetExpires;
        await user.save();

        await sendPasswordResetEmail(email, resetToken)
        return resetToken;
    } catch (error) {
        console.log("Failed to reset password: ", error);
        throw error;
    }
};


export const resetPassword = async(token: string, password: string)=> {
    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: {$gt: Date.now()}
    });

    if(!user){
        throw new Error("Invalid or expired token");
    };

    // Hash new Password
    user.password = await argon2.hash(password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return user;

}




export const getCurrentUser = async(userId: string) => {
    return await User.findById(userId);
};







