const pool = require('../config/database');

/**
 * Create a new user
 * @param {Object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @returns {Object} created user
 */
const createUserService = async ({ name, email }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

/**
 * Get all users
 * @returns {Array} list of users
 */
const getAllUsersService = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
  return result.rows;
};

/**
 * Get a user by ID
 * @param {number} id
 * @returns {Object|null} user or null if not found
 */
const getUserByIdService = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

/**
 * Update a user by ID
 * @param {number} id
 * @param {Object} param1
 * @param {string} param1.name
 * @param {string} param1.email
 * @returns {Object|null} updated user
 */
const updateUserService = async (id, { name, email }) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

/**
 * Delete a user by ID
 * @param {number} id
 * @returns {Object|null} deleted user
 */
const deleteUserService = async (id) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

// Export all service functions
module.exports = {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
};
