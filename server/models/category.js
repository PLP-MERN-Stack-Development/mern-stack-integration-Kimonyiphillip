// // server/models/Category.js
// const mongoose = require('mongoose');

// const CategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please provide a category name'],
//     trim: true,
//     unique: true,
//     maxlength: [50, 'Category name cannot be more than 50 characters'],
//   },
//   description: { 
//     type: String,
//     maxlength: [250, 'Description cannot be more than 250 characters'],
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Category', CategorySchema);
/**
 * Category model
 */

// server/models/category.js
import mongoose from "mongoose";

// ✅ Check if model already exists to prevent OverwriteModelError
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// ✅ Use mongoose.models to prevent model redefinition
const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
