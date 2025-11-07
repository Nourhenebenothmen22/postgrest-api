/**
 * @file createUserTable.js
 * @description Script to initialize the 'users' table in PostgreSQL.
 * This file can be executed manually to ensure the table exists.
 */

const pool = require('../config/database'); // Import your PostgreSQL connection

// ===============================
// 🚀 Create Users Table
// ===============================
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ "users" table created or already exists.');
  } catch (error) {
    console.error('❌ Error creating "users" table:', error.message);
  } finally {
    await pool.end(); // Close DB connection
  }
};

// ===============================
// 🏁 Execute when running this file directly
// ===============================
if (require.main === module) {
  createUserTable();
}

module.exports = createUserTable;
