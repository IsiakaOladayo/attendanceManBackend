const express = require('express');
const router = express.Router();

const authenticate =
    require('../middleware/authMiddleware');

const biometricController =
    require('../controllers/biometricController');

router.post(
    '/verify',
    authenticate,
    biometricController.verifyBiometric
);

module.exports = router;