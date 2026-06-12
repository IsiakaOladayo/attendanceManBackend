const pool = require('../config/db');

const createRole = async (roleName) => {
    const query = `
        INSERT INTO roles (role_name)
        VALUES ($1)
        RETURNING *;
    `;

    const result = await pool.query(query, [roleName]);
    return result.rows[0];
};

const getRoles = async () => {
    const result = await pool.query('SELECT * FROM roles');
    return result.rows;
};

module.exports = {
    createRole,
    getRoles
};