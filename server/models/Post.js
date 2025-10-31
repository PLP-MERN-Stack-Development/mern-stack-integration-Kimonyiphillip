import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  slug: { type: String, unique: true },
  image: { type: String },
}, { timestamps: true });

// 👇 Auto-generate slug from title
postSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;


// const mongoose = require('mongoose');

// const CommentSchema = new mongoose.Schema({
//   userName: { type: String, default: 'Anonymous' },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const PostSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Please provide a title'],
//       trim: true,
//       maxlength: [200, 'Title cannot be more than 200 characters']
//     },
//     content: {
//       type: String,
//       required: [true, 'Please provide content']
//     },
//     excerpt: {
//       type: String,
//       maxlength: [500, 'Excerpt cannot be more than 500 characters']
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     featuredImage: {
//       type: String,
//       default: 'default-post.jpg'
//     },
//     // For core tasks we keep author as string; later you can switch to ObjectId ref to User
//     authorName: {
//       type: String,
//       default: 'Admin'
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Category',
//       required: true
//     },
//     tags: [String],
//     isPublished: {
//       type: Boolean,
//       default: true
//     },
//     viewCount: {
//       type: Number,
//       default: 0
//     },
//     comments: [CommentSchema]
//   },
//   { timestamps: true }
// );

// // Generate slug from title before validation if not set
// PostSchema.pre('validate', function (next) {
//   if (!this.slug && this.title) {
//     this.slug = this.title
//       .toString()
//       .toLowerCase()
//       .replace(/[^\w ]+/g, '')
//       .replace(/ +/g, '-')
//       .slice(0, 200);
//   }
//   next();
// });

// PostSchema.methods.incrementViewCount = function () {
//   this.viewCount += 1;
//   return this.save();
// };

// module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);