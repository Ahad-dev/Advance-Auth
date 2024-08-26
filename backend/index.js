import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: 'https://advance-auth-frontend.vercel.app'
}));
app.options('*', cors({
    origin: 'https://advance-auth-frontend.vercel.app'
}));
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// Routes

app.use('/api/auth', authRoute);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

