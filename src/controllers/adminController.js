const pool = require('../config/db');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const getDashboardStats = async (req, res) => {
    try {

        const students = await pool.query(`
            SELECT COUNT(*) FROM users
            WHERE role_id = 3
        `);

        const lecturers = await pool.query(`
            SELECT COUNT(*) FROM users
            WHERE role_id = 2
        `);

        const attendance = await pool.query(`
            SELECT COUNT(*)
            FROM attendance
            WHERE DATE(check_in) = CURRENT_DATE
        `);

        res.json({
            totalStudents:
                Number(students.rows[0].count),

            totalLecturers:
                Number(lecturers.rows[0].count),

            attendanceToday:
                Number(attendance.rows[0].count)
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                u.id,
                u.name,
                u.email,
                r.role_name
            FROM users u
            JOIN roles r
                ON u.role_id = r.id
            ORDER BY u.id
        `);

        res.json(result.rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role_id
        } = req.body;

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await userModel.createUser(
                name,
                email,
                hashedPassword,
                role_id
            );

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {

    try {

        const user =
            await userModel.updateUser(
                req.params.id,
                req.body.name,
                req.body.email,
                req.body.role_id
            );

        res.json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {

    try {

        await userModel.deleteUser(
            req.params.id
        );

        res.json({
            message:
                "User deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};