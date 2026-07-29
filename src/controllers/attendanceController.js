const attendanceModel = require('../models/attendanceModel');
const biometricModel =
    require('../models/biometricModel');
const networkModel =
    require('../models/networkModel');

const checkIn = async (req, res) => {
    try {

        console.log("USER FROM JWT:", req.user);

        const user_id = req.user.id;
        const { bssid } = req.body;

        console.log(
            "Received BSSID:",
            bssid
        );
        const allowed =
            await networkModel.isAllowedNetwork(
                bssid
            );

        if (!allowed) {

            return res.status(403).json({
                message:
                    'You are not connected to an approved network'
            });
        }

const alreadyCheckedIn =
    await attendanceModel.hasCheckedInToday(
        user_id
    );

if (alreadyCheckedIn) {

    return res.status(409).json({
        message:
            'Attendance already marked today'
    });
}

        //const verified =
        //    await biometricModel.isRecentlyVerified(
        //        user_id
        //    );

        //if (!verified) {
        //    return res.status(403).json({
        //        message: 'Fingerprint verification required'
        //    });
        //}

        const record =
            await attendanceModel.checkIn(user_id);

        res.status(201).json(record);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
};

const checkOut = async (req, res) => {
    try {

        const user_id = req.user.id;

        // Validate request body
        if (!req.body || !req.body.bssid) {
            return res.status(400).json({
                message: "BSSID is required"
            });
        }

        const { bssid } = req.body;

        console.log("Received BSSID:", bssid);

        // Verify Wi-Fi network
        const allowed = await networkModel.isAllowedNetwork(bssid);

        if (!allowed) {
            return res.status(403).json({
                message: "You are not connected to an approved network"
            });
        }

        // Verify recent biometric authentication
        const verified =
            await biometricModel.isRecentlyVerified(user_id);

        if (!verified) {
            return res.status(403).json({
                message: "Biometric verification required"
            });
        }

        // Perform checkout
        const record =
            await attendanceModel.checkOut(user_id);

        if (!record) {
            return res.status(404).json({
                message: "No active attendance session found"
            });
        }

        res.json(record);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
};

const getUserAttendance = async (req, res) => {
    try {
        const records = await attendanceModel.getUserAttendance(
            req.user.id
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

const getAttendanceStats = async (req, res) => {
    try {

        const stats =
            await attendanceModel.getAttendanceStats(
                req.user.id
            );

        res.json(stats);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const getTodayStatus = async (req, res) => {

    try {

        const user_id = req.user.id;

        const status =
            await attendanceModel.getTodayStatus(
                user_id
            );

        res.json(status);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getUserAttendance,
    getAllAttendance,
    getAttendanceStats,
    getTodayStatus
};