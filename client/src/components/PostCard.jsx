// // src/components/PostCard.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const PostCard = ({ post }) => {
// //   return (
// //     <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
// //       <h2>{post.title}</h2>
// //       <p><em>Category: {post.category?.name || 'Uncategorized'}</em></p>
// //       <p><strong>Author:</strong> {post.author?.name || 'Unknown'}</p>
// //       <p>{post.excerpt || post.content.slice(0, 100) + '...'}</p>
// //       <Link to={`/posts/${post._id}`}>Read More</Link>
// //     </div>
// //   );
// // };

// // export default PostCard;
// //......................................................................................
// import React from 'react';
// import { Link } from 'react-router-dom';

// const PostCard = ({ post }) => {
//   return (
//     <div className="post-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
//       <h2>
//         <Link to={`/posts/${post._id}`}>{post.title}</Link>
//       </h2>
//       <p>{post.excerpt || post.content.substring(0, 100) + '...'}</p>
//       <small>Category: {post.category?.name || 'Uncategorized'}</small>
//     </div>
//   );
// };

// export default PostCard;


// //NOTE :
// // Integration with server:
// //post.category and post.author exist because your backend populates these
// //  fields (.populate('author') and .populate('category')) in postsController.getAllPosts.

// client/src/components/PostCard.jsx
// src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">
          <Link to={`/posts/${post._id}`} className="text-blue-700 dark:text-blue-300 hover:underline">
            {post.title}
          </Link>
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>{post.authorName || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{post.category?.name ?? 'Uncategorized'}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          {post.excerpt ?? (post.content ? post.content.slice(0, 120) + '...' : '')}
        </p>
        <div className="flex justify-between items-center">
          <Link to={`/posts/${post._id}`} className="text-sm text-blue-600 dark:text-blue-300">Read more →</Link>
          <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
}

