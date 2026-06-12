const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const attendanceController = require('../controllers/attendanceController');

// Student can check-in/out
router.post(
    '/check-in',
    authenticate,
    authorizeRoles('Student'),
    attendanceController.checkIn
);

router.post(
    '/check-out',
    authenticate,
    authorizeRoles('Student'),
    attendanceController.checkOut
);

// Lecturer & Admin can view attendance
router.get(
    '/',
    authenticate,
    authorizeRoles('Admin', 'Lecturer'),
    attendanceController.getAllAttendance
);

// User can view their own attendance
router.get(
    '/me',
    authenticate,
    authorizeRoles('Student', 'Lecturer', 'Admin'),
    attendanceController.getUserAttendance
);

module.exports = router;