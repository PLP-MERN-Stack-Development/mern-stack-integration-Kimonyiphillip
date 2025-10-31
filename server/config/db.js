/**
 * config/db.js
 * - Connects to MongoDB using mongoose
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not defined in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      // options are set to mongoose defaults in v6+, keep simple
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

