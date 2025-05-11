import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import vibeRouter from './routes/vibeRoutes.js';
import moodsRouter from './routes/moodRoutes.js';

// Inatializing express app
const app = express();

// Configuration
dotenv.config();
const PORT = process.env.PORT || 3000;

// Connection to DB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })) // Parse URL-encoded bodies
app.use(morgan('dev')); // Log HTTP requests
app.use('/uploads', express.static('uploads')); // serve images

// Routes
app.use('/api/vibes', vibeRouter);
app.use('/api/moods', moodsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
