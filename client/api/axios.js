// client/src/api/axios.js
// Axios instance used across the app. Handles baseURL and attaches JWT from localStorage.

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor: handle 401 globally (optional)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove token + redirect to login page
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
