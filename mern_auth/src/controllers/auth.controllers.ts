import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// export const RegisterUser = async (req: Request, res: Response): Promise<void> =>{
//     try {
//         const {name, email, password } = req.body;
//         //Check if the user exists
//         const userExists = await User.findOne({email});
//         if(userExists){
//             res.status(200).json({message: "User exists, Try Login in"});
//             return;
//         }

//         //Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPw = await bcrypt.hash(password, salt);

//         //Create new User
//         const user = new User({name, email, password: hashedPw});
//         await user.save();

//         res.status(201).json({message: "Registration was successful"})

//     } catch (error) {
//         res.status(500).json({message: "An error occured"})
//         console.log({message: "Error occured: ", error})
//     }
// };


// import { Request, Response } from 'express';
// import User from '../models/user.models';
// import bcrypt from 'bcrypt';

export const RegisterUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Request Body:', req.body);
    const { name, email, password } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', userExists);
      res.status(200).json({ message: 'User exists, Try Logging in' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    // Create new User
    const user = new User({ name, email, password: hashedPw });
    await user.save();
    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'Registration was successful' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};



//Login a User
const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error ("JWT_SECRET Variable is not defined")
}
export const loginUser = async(req: Request, res: Response) : Promise<void> => {
    try {

        console.log("Request body", req.body);
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: "User does not exist"});
            return;
        }

        const matchPw = await bcrypt.compare(password, user.password);
        if(!matchPw){
            res.status(400).json({message: "Passwords do not match"});
            return;
        }

        //Generate token
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token, {httpOnly: true});
        res.json({message: "Login successful", token});

    } catch (error) {
        console.error("Error occured", error)
        res.status(500).json({message: "Server Error"})
    }
}