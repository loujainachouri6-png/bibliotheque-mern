const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use('/uploads', express.static('uploads')); // serve uploaded files

// Routes
app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
