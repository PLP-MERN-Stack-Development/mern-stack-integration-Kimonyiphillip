// client/src/api/postService.js
import api from './axios';

// Exposes functions used by components. Each returns the API response (data portion).
export const postService = {
  // page, limit, category (category id)
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    const params = { page, limit };
    if (category) params.category = category;
    const res = await api.get('/posts', { params });
    // API backend returns { success, data, meta } or similar in our server design
    return res.data;
  },

  getPost: async (idOrSlug) => {
    const res = await api.get(`/posts/${idOrSlug}`);
    return res.data;
  },

  addComment: async (postId, commentData) => {
    const res = await api.post(`/posts/${postId}/comments`, commentData);
    return res.data;
  },
};
