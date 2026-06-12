const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.createUser(
            name,
            email,
            hashedPassword,
            role_id
        );

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById
};