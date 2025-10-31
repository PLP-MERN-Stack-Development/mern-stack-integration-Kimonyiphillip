// src/services/categoryService.js
import api from './api';

export const categoryService = {
  getAllCategories: async () => {
    const r = await api.get('/categories');
    // server returns { success, data }
    return r.data?.data ?? r.data;
  },

  createCategory: async (payload) => {
    const r = await api.post('/categories', payload);
    return r.data;
  }
};
