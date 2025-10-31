// server/middleware/checkAdmin.js

exports.checkAdmin = (req, res, next) => {
  // req.user must exist from verifyToken
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }
  next();
};
