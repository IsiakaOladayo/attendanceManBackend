const attendanceModel = require('../models/attendanceModel');

const checkIn = async (req, res) => {
    try {
        const user_id = req.user.id;

        const record = await attendanceModel.checkIn(user_id);

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const checkOut = async (req, res) => {
    try {
        const { user_id } = req.body;

        const record = await attendanceModel.checkOut(user_id);

        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserAttendance = async (req, res) => {
    try {
        const records = await attendanceModel.getUserAttendance(
            req.params.userId
        );

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAttendance = async (req, res) => {
    try {
        const records = await attendanceModel.getAllAttendance();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getUserAttendance,
    getAllAttendance
};