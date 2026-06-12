const pool = require('../config/db');

const createUser = async (name, email, password, role_id) => {
    const query = `
        INSERT INTO users (name, email, password, role_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role_id, created_at;
    `;

    const values = [name, email, password, role_id];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllUsers = async () => {
    const query = `
        SELECT users.id, users.name, users.email, roles.role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
    `;

    const result = await pool.query(query);
    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const query = `
        SELECT users.*, roles.role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
        WHERE users.email = $1
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0];
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail
};