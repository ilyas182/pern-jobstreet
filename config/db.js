const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.TEST_DB,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;