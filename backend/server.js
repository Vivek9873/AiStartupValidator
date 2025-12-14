import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideaRoutes from './routes/ideaRoutes.js';
import ConnectToDB from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
ConnectToDB();
const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json());



// Routes
app.use('/api/ideas', ideaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
