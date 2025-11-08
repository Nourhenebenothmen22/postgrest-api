const Joi = require('joi');

// Define validation schema
const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
      'any.required': 'Name field is required.'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'any.required': 'Email field is required.'
    })
});

// Middleware for validation
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = validateUser;
