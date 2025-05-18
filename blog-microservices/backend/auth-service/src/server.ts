import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes/auth.routes'
import {errorHandler, notFoundHandler} from '../../shared/src/errorHandler/error'
import logger from '../../shared/src/logger/logger';


dotenv.config();
const app = express();

const port = process.env.PORT || 3001;
//Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());


// Routes 
app.use(notFoundHandler)
app.use(errorHandler);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("Auth service DB connected")
    } catch (error) {
        logger.error(`Auth service DB connection error ${error}`)
    }
}

connectDB();

app.use('/api/auth', router)

app.listen(port, ()=> {
    logger.info(`Auth service running on port ${port}`);
    console.log(`Server listening on PORT ${port}`);
});