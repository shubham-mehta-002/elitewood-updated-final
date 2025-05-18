const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {

  // Handle invalid JSON syntax (malformed JSON)
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: 'Invalid JSON',
      error: 'Malformed JSON format. Please check your request and try again.'
    });
  }

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.keys(err.errors).map(field => ({
      field: field,
      message: err.errors[field].message
    }));
    return res.status(400).json({
      message: 'Validation Error',
      errors: errors
    });
  }

  // Handle Mongoose cast errors (for example, invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: 'Invalid ObjectId',
      error: `The provided ID for ${err.path} is invalid.`
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error',
      error: `Duplicate value found for ${Object.keys(err.keyValue)[0]}: ${Object.values(err.keyValue)[0]}`
    });
  }

  // Handle generic server errors
  console.error(err);
  return res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong. Please try again later.'
  });
};

module.exports = errorHandler;
