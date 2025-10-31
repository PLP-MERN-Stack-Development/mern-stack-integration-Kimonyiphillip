// src/context/PostContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { postService } from '../services/postService';

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1, limit = 10, category = '') => {
    setLoading(true);
    try {
      const res = await postService.getAllPosts(page, limit, category);
      // If backend returns an array, wrap it manually
      const postsData = Array.isArray(res) ? res : res.data ?? [];
      const metaData = Array.isArray(res) ? null : res.meta ?? null;
  
      setPosts(postsData);
      setMeta(metaData);
    } catch (err) {
      console.error('fetchPosts error', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, meta, loading, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
}
