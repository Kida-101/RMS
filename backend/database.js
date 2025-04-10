const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  password: 'Nesra@8899',
  host: 'localhost',
  port: 5432,
  database: 'Restaurant_management_system'
})
module.exports = pool;
