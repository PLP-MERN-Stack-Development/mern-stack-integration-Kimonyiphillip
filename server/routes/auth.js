// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { runValidation } = require('../middleware/validate');
const authMiddleware = require('../middleware/auth');

// Register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  runValidation,
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  runValidation,
  authController.login
);

// Get current user
router.get('/me', authMiddleware.protect, authController.getMe);

module.exports = router;

