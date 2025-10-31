// /**
//  * routes/posts.js
//  * - Defines routes for posts and maps to postsController
//  */

// const express = require('express');
// const router = express.Router();
// const { body, param, query } = require('express-validator');

// const postsController = require('../controllers/postsController');
// const { runValidation } = require('../middleware/validate');

// // GET /api/posts?page=&limit=&category=
// router.get(
//   '/',
//   [
//     query('page').optional().isInt({ min: 1 }).withMessage('Page must be >= 1'),
//     query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be >= 1')
//   ],
//   runValidation,
//   postsController.getAllPosts
// );

// // GET /api/posts/:id
// router.get('/:id', postsController.getPostByIdOrSlug);

// // POST /api/posts
// router.post(
//   '/',
//   [
//     body('title').notEmpty().withMessage('Title is required'),
//     body('content').notEmpty().withMessage('Content is required'),
//     body('category').notEmpty().withMessage('Category id is required')
//   ],
//   runValidation,
//   postsController.createPost
// );

// // PUT /api/posts/:id
// router.put(
//   '/:id',
//   [
//     param('id').notEmpty().withMessage('Post id is required')
//     // additional validation for body fields can be added
//   ],
//   runValidation,
//   postsController.updatePost
// );

// // DELETE /api/posts/:id
// router.delete('/:id', postsController.deletePost);

// // POST /api/posts/:postId/comments
// router.post(
//   '/:postId/comments',
//   [
//     param('postId').notEmpty().withMessage('postId is required'),
//     body('content').notEmpty().withMessage('Comment content required')
//   ],
//   runValidation,
//   postsController.addComment
// );

// module.exports = router;




// // // Post.js - Mongoose model for blog posts

// // const mongoose = require('mongoose');

// // const PostSchema = new mongoose.Schema(
// //   {
// //     title: {
// //       type: String,
// //       required: [true, 'Please provide a title'],
// //       trim: true,
// //       maxlength: [100, 'Title cannot be more than 100 characters'],
// //     },
// //     content: {
// //       type: String,
// //       required: [true, 'Please provide content'],
// //     },
// //     featuredImage: {
// //       type: String,
// //       default: 'default-post.jpg',
// //     },
// //     slug: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //     },
// //     excerpt: {
// //       type: String,
// //       maxlength: [200, 'Excerpt cannot be more than 200 characters'],
// //     },
// //     author: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'User',
// //       required: true,
// //     },
// //     category: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Category',
// //       required: true,
// //     },
// //     tags: [String],
// //     isPublished: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     viewCount: {
// //       type: Number,
// //       default: 0,
// //     },
// //     comments: [
// //       {
// //         user: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: 'User',
// //         },
// //         content: {
// //           type: String,
// //           required: true,
// //         },
// //         createdAt: {
// //           type: Date,
// //           default: Date.now,
// //         },
// //       },
// //     ],
// //   },
// //   { timestamps: true }
// // );

// // // Create slug from title before saving
// // PostSchema.pre('save', function (next) {
// //   if (!this.isModified('title')) {
// //     return next();
// //   }
  
// //   this.slug = this.title
// //     .toLowerCase()
// //     .replace(/[^\w ]+/g, '')
// //     .replace(/ +/g, '-');
    
// //   next();
// // });

// // // Virtual for post URL
// // PostSchema.virtual('url').get(function () {
// //   return `/posts/${this.slug}`;
// // });

// // // Method to add a comment
// // PostSchema.methods.addComment = function (userId, content) {
// //   this.comments.push({ user: userId, content });
// //   return this.save();
// // };

// // // Method to increment view count
// // PostSchema.methods.incrementViewCount = function () {
// //   this.viewCount += 1;
// //   return this.save();
// // };

// // module.exports = mongoose.model('Post', PostSchema); 
import express from "express";
import multer from "multer";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";

const router = express.Router();

// ✅ Configure Multer (for image uploads)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("image"), createPost);
router.put("/:id", upload.single("image"), updatePost);
router.delete("/:id", deletePost);

export default router;
