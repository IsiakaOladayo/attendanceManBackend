const express = require('express');

const app = require('./src/app');

//Import DB in Your Server
require('dotenv').config();
require('./src/config/db'); // initialize DB connection

// Define port
const PORT = 5000;


// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Attendance Management API is running' });
});


// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});