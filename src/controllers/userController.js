const pool = require('../config/database');
const { 
  createUserService, 
  getAllUsersService, 
  getUserByIdService, 
  updateUserService, 
  deleteUserService 
} = require('../models/user.model');

// ============================
// Helper: Unified Response
// ============================
const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status: status >= 200 && status < 300 ? 'success' : 'error',
    message,
    data,
  });
};

// ============================
// Controller: Create a New User
// ============================
exports.createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUserService({ name, email });
    handleResponse(res, 201, 'User created successfully', newUser);
  } catch (error) {
    next(error);
  }
};

// ============================
// Controller: Get All Users
// ============================
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, 'Users fetched successfully', users);
  } catch (error) {
    next(error);
  }
};

// ============================
// Controller: Get User by ID
// ============================
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);

    if (!user) {
      return handleResponse(res, 404, 'User not found');
    }

    handleResponse(res, 200, 'User fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

// ============================
// Controller: Update User by ID
// ============================
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await updateUserService(id, { name, email });

    if (!updatedUser) {
      return handleResponse(res, 404, 'User not found');
    }

    handleResponse(res, 200, 'User updated successfully', updatedUser);
  } catch (error) {
    next(error);
  }
};

// ============================
// Controller: Delete User by ID
// ============================
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserService(id);

    if (!deletedUser) {
      return handleResponse(res, 404, 'User not found');
    }

    handleResponse(res, 200, 'User deleted successfully', deletedUser);
  } catch (error) {
    next(error);
  }
};
