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

const hasCheckedInToday = async (user_id) => {
    const query = `
        SELECT *
        FROM attendance
        WHERE user_id = $1
        AND DATE(check_in) = CURRENT_DATE
        LIMIT 1;
    `;

    const result = await pool.query(
        query,
        [user_id]
    );

    return result.rows.length > 0;
};

const checkOut = async (user_id) => {
    const query = `
        UPDATE attendance
        SET check_out = NOW()
        WHERE id = (
            SELECT id
            FROM attendance
            WHERE user_id = $1
            AND check_out IS NULL
            ORDER BY check_in DESC
            LIMIT 1
        )
        RETURNING *;
    `;

    const result = await pool.query(
        query,
        [user_id]
    );

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

const getAttendanceStats = async (user_id) => {

    const presentQuery = `
        SELECT COUNT(*) AS present_days
        FROM attendance
        WHERE user_id = $1;
    `;

    const presentResult =
        await pool.query(
            presentQuery,
            [user_id]
        );

    const presentDays =
        parseInt(
            presentResult.rows[0].present_days
        );

    return {
        presentDays
    };
};

const getTodayStatus = async (user_id) => {

    const query = `
        SELECT *
        FROM attendance
        WHERE user_id = $1
        AND DATE(check_in) = CURRENT_DATE
        ORDER BY check_in DESC
        LIMIT 1;
    `;

    const result = await pool.query(
        query,
        [user_id]
    );

    if (result.rows.length === 0) {
        return {
            checkedIn: false,
            checkedOut: false
        };
    }

    const attendance = result.rows[0];

    return {
        checkedIn: true,
        checkedOut: attendance.check_out !== null
    };
};

module.exports = {
    checkIn,
    checkOut,
    getUserAttendance,
    getAllAttendance,
    hasCheckedInToday,
    getAttendanceStats,
    getTodayStatus
};