// src/services/postService.js
import api from './api';

// postService uses the backend endpoints we built earlier.
export const postService = {
  getAllPosts: async (page = 1, limit = 10, category = '') => {
    const params = { page, limit };
    if (category) params.category = category;
    const r = await api.get('/posts', { params });
    return r.data; // { success, data, meta }
  },

  getPost: async (idOrSlug) => {
    const r = await api.get(`/posts/${idOrSlug}`);
    return r.data; // { success, data }
  },

  createPost: async (postData) => {
    const r = await api.post('/posts', postData);
    return r.data;
  },

  updatePost: async (id, postData) => {
    const r = await api.put(`/posts/${id}`, postData);
    return r.data;
  },

  deletePost: async (id) => {
    const r = await api.delete(`/posts/${id}`);
    return r.data;
  },

  addComment: async (postId, commentData) => {
    const r = await api.post(`/posts/${postId}/comments`, commentData);
    return r.data;
  },

  searchPosts: async (q) => {
    const r = await api.get(`/posts/search?q=${encodeURIComponent(q)}`);
    return r.data;
  }
};
