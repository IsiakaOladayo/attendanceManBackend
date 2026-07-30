const pool = require('../config/db');


//const createUser = async (name, email, password, role_id) => {
//    const query = `
//        INSERT INTO users (name, email, password, role_id)
//        VALUES ($1, $2, $3, $4)
//        RETURNING id, name, email, role_id, created_at;
//    `;

//    const values = [name, email, password, role_id];

//    const result = await pool.query(query, values);
//    return result.rows[0];
//};

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

const createUser = async (
    name,
    email,
    password,
    role_id
) => {

    const result = await pool.query(
        `
        INSERT INTO users
        (
            name,
            email,
            password,
            role_id
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
            name,
            email,
            password,
            role_id
        ]
    );

    return result.rows[0];
};

const updateUser = async (
    id,
    name,
    email,
    role_id
) => {

    const result = await pool.query(
        `
        UPDATE users
        SET
            name = $1,
            email = $2,
            role_id = $3
        WHERE id = $4
        RETURNING *
        `,
        [
            name,
            email,
            role_id,
            id
        ]
    );

    return result.rows[0];
};

const deleteUser = async (id) => {

    await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        `,
        [id]
    );
};

const getProfile = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            id,
            full_name,
            email,
            role,
            department
        FROM users
        WHERE id = $1
        `,
        [userId]
    );

    return result.rows[0];
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    getProfile
};