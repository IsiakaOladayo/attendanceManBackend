const express = require('express');
const router = express.Router();

const authenticate =
    require('../middleware/authMiddleware');

const authorizeRoles =
    require('../middleware/roleMiddleware');

const adminController =
    require('../controllers/adminController');

router.get(
    '/dashboard',
    authenticate,
    authorizeRoles('Admin'),
    adminController.getDashboardStats
);

router.get(
    '/users',
    authenticate,
    authorizeRoles('Admin'),
    adminController.getAllUsers
);

router.post(
    '/users',
    authenticate,
    authorizeRoles('Admin'),
    adminController.createUser
);

router.put(
    '/users/:id',
    authenticate,
    authorizeRoles('Admin'),
    adminController.updateUser
);

router.delete(
    '/users/:id',
    authenticate,
    authorizeRoles('Admin'),
    adminController.deleteUser
);

module.exports = router;