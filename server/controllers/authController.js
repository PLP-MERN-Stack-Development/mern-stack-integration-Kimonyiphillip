// server/controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * Helper: generate JWT token (expires in 7 days)
 */
const generateToken = (user) => {
  const payload = { id: user._id, name: user.name, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    // Prevent duplicate emails
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: { user: user.toJSON(), token },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 * @access Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ success: true, data: { user: user.toJSON(), token } });
  } catch (err) {
    next(err);
  }
};

/**
 * @route GET /api/auth/me
 * @desc Get current logged-in user
 * @access Private (requires auth middleware)
 */
exports.getMe = async (req, res, next) => {
  try {
    // auth middleware sets req.user
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
