// // server/controllers/categoriesController.js

// const Category = require('../models/Category');

// // @desc    Get all categories
// // @route   GET /api/categories
// // @access  Public
// exports.getAllCategories = async (req, res, next) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });
//     res.json({ success: true, count: categories.length, data: categories });
//   } catch (err) {
//     next(err);
//   }
// };

// // @desc    Create a new category
// // @route   POST /api/categories
// // @access  Private/Admin (for now no auth - open access)
// exports.createCategory = async (req, res, next) => {
//   try {
//     const { name, description } = req.body;

//     const existingCategory = await Category.findOne({ name });
//     if (existingCategory) {
//       return res.status(400).json({ success: false, message: 'Category already exists' });
//     }

//     const category = await Category.create({ name, description });
//     res.status(201).json({ success: true, data: category });
//   } catch (err) {
//     next(err);
//   }
// };

// // @desc    Get single category by ID
// // @route   GET /api/categories/:id
// // @access  Public
// exports.getCategoryById = async (req, res, next) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ success: false, message: 'Category not found' });
//     }
//     res.json({ success: true, data: category });
//   } catch (err) {
//     next(err);
//   }
// };

// // @desc    Update a category
// // @route   PUT /api/categories/:id
// // @access  Private/Admin
// exports.updateCategory = async (req, res, next) => {
//   try {
//     const updatedCategory = await Category.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ success: false, message: 'Category not found' });
//     }

//     res.json({ success: true, data: updatedCategory });
//   } catch (err) {
//     next(err);
//   }
// };

// // @desc    Delete a category
// // @route   DELETE /api/categories/:id
// // @access  Private/Admin
// exports.deleteCategory = async (req, res, next) => {
//   try {
//     const deletedCategory = await Category.findByIdAndDelete(req.params.id);

//     if (!deletedCategory) {
//       return res.status(404).json({ success: false, message: 'Category not found' });
//     }

//     res.json({ success: true, message: 'Category deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// };


// server/controllers/categoryController.js
/**
 * categoriesController.js
 * - GET /api/categories
 * - POST /api/categories
 * - PUT /api/categories/:id
 * - DELETE /api/categories/:id
 *
 * For core tasks the routes are public (no auth). We keep simple validation.
 */

import Category from "../models/category.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const newCategory = await Category.create({ name });
    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories }); // ✅ consistent response
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

