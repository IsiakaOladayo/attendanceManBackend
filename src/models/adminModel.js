const pool = require("../config/db");

const getAllUsers = async () => {

    const query = `
        SELECT
            u.id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r
        ON u.role_id = r.id
        ORDER BY u.id;
    `;

    const result =
        await pool.query(query);

    return result.rows;
};

module.exports = {
    getAllUsers
};