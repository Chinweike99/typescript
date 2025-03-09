// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db';
// import authRoutes from './routes/auth.routes'

// dotenv.config();

// const port = process.env.PORT;
// const app = express();
// //connect mongoDB
// connectDB();
// // Middlewares
// app.use(express.json())
// app.use(cors());
// app.use(cookieParser());
// app.use("api/auth", authRoutes);


// app.get('/test', (req, res)=>{
//     res.status(200).json({message: "Hello Chinwe"})
//     // res.send("Good day Chinweike")
// })

// app.listen(port, () => {
//     console.log(`Listening on http://localhost:${port}`);
// })


import express from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Test endpoint
app.get('/test', (req, res) => {
  res.send('Server is running!');
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});