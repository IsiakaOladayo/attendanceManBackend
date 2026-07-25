const pool = require('../config/db');

const createVerification = async (user_id) => {
    const query = `
        INSERT INTO biometric_sessions (user_id)
        VALUES ($1)
        RETURNING *;
    `;

    const result = await pool.query(query, [user_id]);
    return result.rows[0];
};

const isRecentlyVerified = async (user_id) => {
    const query = `
        SELECT *
        FROM biometric_sessions
        WHERE user_id = $1
        AND verified_at > NOW() - INTERVAL '2 minutes'
        ORDER BY verified_at DESC
        LIMIT 1;
    `;

    const result = await pool.query(query, [user_id]);

    return result.rows.length > 0;
};

module.exports = {
    createVerification,
    isRecentlyVerified
};