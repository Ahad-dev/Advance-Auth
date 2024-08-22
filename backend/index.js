import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;
const __dirname = path.resolve();

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// Routes

app.use('/api/auth', authRoute);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

