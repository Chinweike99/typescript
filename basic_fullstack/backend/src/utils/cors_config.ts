import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();



export const configCors = ()=> {
    return cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:3000',
                process.env.CLIENT_URL
            ]
            if(!origin || allowedOrigins.indexOf(origin) !== -1){
                callback(null, true);
            }else{
                callback(new Error("Not allowed by cors"))
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: [
            "Content-Range",
            "X-Content-Range"
        ],
        credentials: true,
        preflightContinue: false,
        maxAge: 600,
        optionsSuccessStatus: 204
    })
}


