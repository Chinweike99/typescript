import mongoose from "mongoose";


const connectDB = async() => {

    const MONGO_URI: string | undefined = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error('Error: MONGO_URI environment variable is not defined.');
        process.exit(1);
      }
        

    try {
        const connect = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`)
        process.exit(1);
    }
}

export default connectDB;