const pool = require('../config/db');

const checkIn = async (user_id) => {
    const query = `
        INSERT INTO attendance (user_id, check_in)
        VALUES ($1, NOW())
        RETURNING *;
    `;

    const result = await pool.query(query, [user_id]);
    return result.rows[0];
};

const checkOut = async (user_id) => {
    const query = `
        UPDATE attendance
        SET check_out = NOW()
        WHERE user_id = $1
        AND check_out IS NULL
        RETURNING *;
    `;

    const result = await pool.query(query, [user_id]);
    return result.rows[0];
};

const getUserAttendance = async (user_id) => {
    const query = `
        SELECT *
        FROM attendance
        WHERE user_id = $1
        ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [user_id]);
    return result.rows;
};

const getAllAttendance = async () => {
    const query = `
        SELECT users.name, attendance.check_in, attendance.check_out
        FROM attendance
        JOIN users ON attendance.user_id = users.id
        ORDER BY attendance.created_at DESC
    `;

    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    checkIn,
    checkOut,
    getUserAttendance,
    getAllAttendance
};