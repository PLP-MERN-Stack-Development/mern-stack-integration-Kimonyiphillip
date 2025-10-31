// // server/routes/categories.js
// const express = require('express');
// const router = express.Router();
// const { body, param } = require('express-validator');

// const categoryController = require('../controllers/categoriesController'); // <--- fixed path
// const { runValidation } = require('../middleware/validate');
// const { verifyToken } = require('../middleware/auth');
// const { checkAdmin } = require('../middleware/checkAdmin');

// // Public route - get all categories
// router.get('/', categoryController.getAllCategories);

// // Admin routes
// router.post(
//   '/',
//   verifyToken,        // make sure user is logged in
//   checkAdmin,         // check user role
//   [body('name').notEmpty().withMessage('Name is required')],
//   runValidation,
//   categoryController.createCategory
// );

// router.put(
//   '/:id',
//   verifyToken,
//   checkAdmin,
//   [param('id').notEmpty().withMessage('Category ID is required')],
//   runValidation,
//   categoryController.updateCategory
// );

// router.delete(
//   '/:id',
//   verifyToken,
//   checkAdmin,
//   [param('id').notEmpty().withMessage('Category ID is required')],
//   runValidation,
//   categoryController.deleteCategory
// );

// module.exports = router;
/**
 * routes/categories.js
 * - Public category CRUD routes (for core tasks we leave them public)
 */

import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);

export default router;

