
// /**
//  * postsController.js
//  * - Implements core endpoints for posts:
//  *   GET /api/posts           -> list posts (pagination, optional category)
//  *   GET /api/posts/:id       -> get single post by id or slug
//  *   POST /api/posts          -> create post
//  *   PUT /api/posts/:id       -> update post
//  *   DELETE /api/posts/:id    -> delete post
//  * - Also includes a simple add-comment endpoint (optional)
//  */
// const mongoose = require('mongoose');
// const Post = require('../models/Post');
// const Category = require('../models/Category');

// // GET /api/posts
// exports.getAllPosts = async (req, res, next) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page || '1'));
//     const limit = Math.max(1, parseInt(req.query.limit || '10'));
//     const skip = (page - 1) * limit;
//     const category = req.query.category || null;
//     const filter = {};

//     if (category) {
//       // accept either category id or name
//       if (mongoose.Types.ObjectId.isValid(category)) {
//         filter.category = category;
//       } else {
//         const cat = await Category.findOne({ name: category });
//         if (cat) filter.category = cat._id;
//       }
//     }

//     const [posts, total] = await Promise.all([
//       Post.find(filter)
//         .populate('category', 'name')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Post.countDocuments(filter)
//     ]);

//     res.json({
//       success: true,
//       data: posts,
//       meta: {
//         total,
//         page,
//         limit,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // GET /api/posts/:id  (accepts Mongo id or slug)
// exports.getPostByIdOrSlug = async (req, res, next) => {
//   try {
//     const idOrSlug = req.params.id;
//     let post = null;

//     if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
//       post = await Post.findById(idOrSlug).populate('category', 'name');
//     }

//     if (!post) {
//       post = await Post.findOne({ slug: idOrSlug }).populate('category', 'name');
//     }

//     if (!post) {
//       const err = new Error('Post not found');
//       err.statusCode = 404;
//       throw err;
//     }

//     // increment view count (non-blocking)
//     post.incrementViewCount().catch((e) => console.warn('Failed to increment view count', e));

//     res.json({ success: true, data: post });
//   } catch (err) {
//     next(err);
//   }
// };

// // POST /api/posts
// exports.createPost = async (req, res, next) => {
//   try {
//     const { title, content, authorName, category, excerpt, tags, isPublished, featuredImage } = req.body;

//     if (!title || !content || !category) {
//       return res.status(400).json({ success: false, message: 'title, content and category are required' });
//     }

//     // validate category exists
//     if (!mongoose.Types.ObjectId.isValid(category)) {
//       return res.status(400).json({ success: false, message: 'Invalid category id' });
//     }
//     const cat = await Category.findById(category);
//     if (!cat) {
//       return res.status(400).json({ success: false, message: 'Category not found' });
//     }

//     const post = new Post({
//       title,
//       content,
//       authorName,
//       category,
//       excerpt,
//       tags,
//       isPublished,
//       featuredImage
//     });

//     await post.save();
//     await post.populate('category', 'name');

//     res.status(201).json({ success: true, data: post });
//   } catch (err) {
//     // handle duplicate slug
//     if (err.code === 11000) {
//       err.message = 'A post with this slug already exists';
//       err.statusCode = 400;
//     }
//     next(err);
//   }
// };

// // PUT /api/posts/:id
// exports.updatePost = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid post id' });
//     }

//     const updateData = req.body;

//     // If category provided, validate it
//     if (updateData.category && !mongoose.Types.ObjectId.isValid(updateData.category)) {
//       return res.status(400).json({ success: false, message: 'Invalid category id' });
//     }

//     const post = await Post.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('category', 'name');
//     if (!post) {
//       return res.status(404).json({ success: false, message: 'Post not found' });
//     }

//     res.json({ success: true, data: post });
//   } catch (err) {
//     next(err);
//   }
// };

// // DELETE /api/posts/:id
// exports.deletePost = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid post id' });
//     }

//     const post = await Post.findByIdAndDelete(id);
//     if (!post) {
//       return res.status(404).json({ success: false, message: 'Post not found' });
//     }

//     res.json({ success: true, message: 'Post deleted' });
//   } catch (err) {
//     next(err);
//   }
// };

// // Optional: POST /api/posts/:postId/comments  (simple comment add)
// exports.addComment = async (req, res, next) => {
//   try {
//     const postId = req.params.postId;
//     const { userName, content } = req.body;
//     if (!content) return res.status(400).json({ success: false, message: 'Comment content required' });

//     if (!mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ success: false, message: 'Invalid post id' });
//     }

//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

//     post.comments.push({ userName: userName || 'Anonymous', content });
//     await post.save();
//     res.status(201).json({ success: true, data: post.comments });
//   } catch (err) {
//     next(err);
//   }
// };

import Post from "../models/Post.js";

// ✅ Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get one post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("category");
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create post (with image)
// ✅ Create post (with image)
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";  // ✅ note the leading slash

    const post = new Post({ title, content, category, image });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("createPost error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Update post
export const updatePost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    if (req.file) post.image = `/uploads/${req.file.filename}`;

    const updated = await post.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
