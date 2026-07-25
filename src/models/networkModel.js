const pool = require('../config/db');

const isAllowedNetwork = async (bssid) => {

    const result = await pool.query(
        `
        SELECT *
        FROM allowed_networks
        WHERE LOWER(bssid) = LOWER($1)
        `,
        [bssid]
    );

    return result.rows.length > 0;
};

module.exports = {
    isAllowedNetwork
};