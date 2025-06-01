import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import vibeRouter from './routes/vibeRoutes.js';
import moodsRouter from './routes/moodRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
// This is necessary to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inatializing express app
const app = express();

// Configuration
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connection to DB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));      // Enable CORS
app.use(express.json());                                                    // Parse JSON bodies
app.use(express.urlencoded({ extended: false }))                            // Parse URL-encoded bodies
app.use(morgan('dev'));                                                     // Log HTTP requests
app.use('/images', express.static(path.join(__dirname, 'images')));         // Serve the images folder statically

app.use('/api/vibes', vibeRouter);                                          // Vibe routes
app.use('/api/moods', moodsRouter);                                         // Mood routes  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
