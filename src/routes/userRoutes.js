/**
 * @file userRoutes.js
 * @description Defines all user-related API endpoints.
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const validateUser = require('../middlewares/validationMiddleware');

// ============================
// 📦 User Routes
// ============================

// @route   POST /api/v1/users
// @desc    Create a new user
router.post('/',validateUser, createUser);

// @route   GET /api/v1/users
// @desc    Get all users
router.get('/', getAllUsers);

// @route   GET /api/v1/users/:id
// @desc    Get a single user by ID
router.get('/:id', getUserById);

// @route   PUT /api/v1/users/:id
// @desc    Update a user by ID
router.put('/:id',validateUser, updateUser);

// @route   DELETE /api/v1/users/:id
// @desc    Delete a user by ID
router.delete('/:id', deleteUser);

// ============================
// Export Router
// ============================
module.exports = router;
