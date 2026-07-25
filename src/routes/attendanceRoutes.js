const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const attendanceController = require('../controllers/attendanceController');

console.log('attendanceRoutes loaded');

// Student can check-in/out
router.post(
    '/check-in',
    authenticate,
    authorizeRoles('Student', 'Admin'),
    attendanceController.checkIn
);

router.post(
    '/check-out',
    authenticate,
    authorizeRoles('Student', 'Admin'),
    attendanceController.checkOut
);

// Lecturer & Admin can view attendance
router.get(
    '/',
    authenticate,
    authorizeRoles('Admin', 'Lecturer'),
    attendanceController.getAllAttendance
);

router.get(
    '/stats',
    authenticate,
    authorizeRoles(
        'Student',
        'Lecturer',
        'Admin'
    ),
    attendanceController.getAttendanceStats
);

router.get(
    '/today',
    authenticate,
    authorizeRoles(
        'Student',
        'Lecturer',
        'Admin'
    ),
    attendanceController.getTodayStatus
);

// User can view their own attendance
router.get(
    '/me',
    authenticate,
    authorizeRoles('Student', 'Lecturer', 'Admin'),
    attendanceController.getUserAttendance
);



module.exports = router;