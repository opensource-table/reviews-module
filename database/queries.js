const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'ec2-18-219-239-88.us-east-2.compute.amazonaws.com',
  database: 'reviews',
  password: '',
  port: 5432,
});

module.exports = { pool };