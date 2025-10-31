/**
 * Central error handler middleware
 * - Should be the last middleware registered in server.js
 */

module.exports = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error'
  });
};

// server/middleware/errorHandler.js  
