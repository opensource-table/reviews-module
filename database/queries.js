const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'scotttorres',
  host: 'localhost',
  database: 'reviews',
  password: '',
  port: 5432,
});

module.exports = { pool };