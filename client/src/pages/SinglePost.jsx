// // src/pages/SinglePost.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { postService } from '../services/api';

// const SinglePost = () => {
//   const { id } = useParams(); // post ID from URL
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);

//   // ------------------------
//   // Fetch single post from API
//   // ------------------------
//   const fetchPost = async () => {
//     try {
//       setLoading(true);
//       const data = await postService.getPost(id);
//       setPost(data.data);
//       setComments(data.data.comments || []);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch post.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   // ------------------------
//   // Add comment
//   // ------------------------
//   const handleAddComment = async () => {
//     if (!comment.trim()) return;
//     try {
//       const data = await postService.addComment(id, { content: comment });
//       setComments(data.data); // update comments with server response
//       setComment('');
//     } catch (err) {
//       alert('Failed to add comment.');
//     }
//   };

//   if (loading) return <p>Loading post...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (!post) return <p>Post not found.</p>;

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p><em>Category: {post.category?.name || 'Uncategorized'}</em></p>
//       <p><strong>Author:</strong> {post.author?.name || 'Unknown'}</p>
//       <p>{post.content}</p>

//       <hr />

//       <h3>Comments</h3>
//       {comments.length === 0 && <p>No comments yet.</p>}
//       <ul>
//         {comments.map((c, index) => (
//           <li key={index}>
//             <strong>{c.user?.name || 'Anonymous'}:</strong> {c.content}
//           </li>
//         ))}
//       </ul>

//       <div>
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Add a comment..."
//           rows={3}
//           style={{ width: '100%', marginTop: '1rem' }}
//         />
//         <button onClick={handleAddComment} style={{ marginTop: '0.5rem' }}>
//           Submit Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SinglePost;

// //New SinglePost page to display full post content.
// //Fetches post by id from URL parameters.
// src/pages/SinglePost.jsx
// src/pages/SinglePost.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await postService.getPost(id);
      setPost(res.data ?? res);
    } catch (err) {
      console.error(err);
      alert('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!post) return <div className="py-20 text-center">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {post.authorName} • {new Date(post.createdAt).toLocaleDateString()} • {post.category?.name}
        </div>

        <div className="prose dark:prose-invert">
          <p>{post.content}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700" onClick={() => navigate(-1)}>Back</button>
          {/* Edit & delete would go here once auth is added */}
        </div>
      </div>
    </div>
  );
}
// A simple page to show a single post's full content.
