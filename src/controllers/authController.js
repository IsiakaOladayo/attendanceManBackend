const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const biometricModel = require('../models/biometricModel');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role_name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const verifyBiometric = async (req, res) => {
    try {

        const user_id = req.user.id;

        const record =
            await biometricModel.createVerification(
                user_id
            );

        res.json({
            message: 'Biometric verified',
            record
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    login,
    verifyBiometric
};