const { Pool } = require('pg');

const pool = new Pool({
  user: 'voice',
  host: 'localhost',
  database: 'voiceadvancedatabase',
  password: 'Towasama9797',
  port: 5432,
});

module.exports = pool;
