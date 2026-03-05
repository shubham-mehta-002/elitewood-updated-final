const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { initializeAdmin } = require('./utils/initializeAdmin');
const errorHandler = require('./middlewares/errorMiddleware');

// Load env
dotenv.config();

// Connect to DB
connectDB();

// Init app
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));

// Initialize Admin
initializeAdmin();


// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
