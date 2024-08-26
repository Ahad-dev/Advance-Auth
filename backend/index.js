import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;


// Middleware
app.use(cors({
    origin: 'https://advance-auth-frontend.vercel.app', // Only allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.options('*', cors());
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies


// Connect to the database
connectDB();

// Routes

app.use('/api/auth', authRoute);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

