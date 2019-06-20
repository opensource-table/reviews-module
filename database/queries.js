const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '18.188.224.126',
  database: 'reviews',
  password: 'hydroflask',
  port: 5432,
});

module.exports = { pool };
