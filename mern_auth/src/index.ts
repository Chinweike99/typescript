import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
dotenv.config();

const port = process.env.PORT;
const app = express();
//connect mongoDB
connectDB();
// Middlewares
app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.status(200).json({message: "Hello Chinwe"})
    // res.send("Good day Chinweike")
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})