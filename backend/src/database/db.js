const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movie-theater-ticket-reservation-web-app',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;