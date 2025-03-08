// import { Request, Response } from "express";
// import User from "../models/user.models";
// import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken";


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


import { Request, Response } from 'express';
import User from '../models/user.models';
import bcrypt from 'bcrypt';

export const RegisterUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Request Body:', req.body); // Log the request body

    const { name, email, password } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', userExists); // Log if user exists
      res.status(200).json({ message: 'User exists, Try Logging in' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    // Create new User
    const user = new User({ name, email, password: hashedPw });
    await user.save();

    console.log('User registered successfully:', user); // Log the registered user
    res.status(201).json({ message: 'Registration was successful' });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    res.status(500).json({ message: 'An error occurred' });
  }
};