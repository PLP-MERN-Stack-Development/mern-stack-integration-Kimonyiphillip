/**
 * validate.js
 * - Helper to run express-validator checks and return formatted errors
 */

const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return first error message(s)
    const extracted = errors.array().map(err => ({ [err.param]: err.msg }));
    return res.status(400).json({
      success: false,
      errors: extracted
    });
  }
  next();
};

