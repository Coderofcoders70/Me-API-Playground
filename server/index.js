const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173" 
}));
app.use(express.json()); 
app.use('/api/profile', profileRoutes);

// Basic Health Check 
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running and healthy',
    timestamp: new Date().toISOString()
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });