// database.js
import pkg from 'pg'; // Import pg as a default import to avoid common module issues
const { Pool } = pkg;


const pool = new Pool({
  user: 'postgres',
  password: 'Nesra@8899',
  host: 'localhost',
  port: 5432,
  database: 'RMS'
});

export default pool; // Ensure correct export syntax.
