import express from 'express';
import dotenv, { config } from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes';
import errorHandlers from './middlewares/errorHandlers';
import * as authController from './controllers/auth.controllers'; 


dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI as string)
    .then(()=> console.log("Connected to mongoDB"))
    .catch(error => console.log("MongoDB connection error: ", error));

    // Add direct route for email verification that matches the URL in the emails
app.get('/verify-email', authController.verify);
app.get('/reset-password', authController.resetPasswordForm);

// Routes
app.use('/api/v1', routes)

// Error handling middleware
app.use(errorHandlers);



export default app;




