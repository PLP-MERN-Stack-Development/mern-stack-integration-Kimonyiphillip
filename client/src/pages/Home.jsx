import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition"
        >
          {post.image && (
            <img
              src={`http://localhost:5000${post.image}`}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-bold dark:text-gray-100">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {post.content.substring(0, 80)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;


// // src/pages/Home.jsx
// import React, { useContext, useEffect, useState } from 'react';
// import { PostContext } from '../context/PostContext';
// import PostCard from '../components/PostCard';
// import CategoryFilter from '../components/categoryFilter';

// export default function Home() {
//   const { posts, loading, fetchPosts } = useContext(PostContext);
//   const [category, setCategory] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     fetchPosts(page, 9, category);
//   }, [page, category]); // re-fetch when page or category changes

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center justify-between py-6">
//         <h1 className="text-3xl font-bold">Latest Posts</h1>
//         <div className="w-64">
//           <CategoryFilter value={category} onChange={setCategory} />
//         </div>
//       </div>

//       {loading ? (
//         <div className="py-20 text-center">Loading...</div>
//       ) : posts.length === 0 ? (
//         <div className="py-20 text-center text-gray-500">No posts found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.map(p => <PostCard key={p._id} post={p} />)}
//         </div>
//       )}

//       {/* simple paging controls */}
//       <div className="flex justify-between items-center mt-8">
//         <button
//           className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
//           onClick={() => setPage(p => Math.max(1, p - 1))}
//         >Previous</button>

//         <div>Page {page}</div>

//         <button
//           className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
//           onClick={() => setPage(p => p + 1)}
//         >Next</button>
//       </div>
//     </div>
//   );
// }
