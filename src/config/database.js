const { Pool } = require('pg');
require('dotenv').config();

// Create a pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// ✅ Log when connected
pool.connect()
  .then(() => console.log('✅ PostgreSQL connection established'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

// Handle unexpected errors on idle clients
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
