const express = require('express');

const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes');
const biometricRoutes =
    require('./routes/biometricRoutes');
const pool = require('./config/db');
const cors = require('cors');
const adminRoutes =
    require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRoutes);

// Base routes
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/biometric', biometricRoutes);


app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;