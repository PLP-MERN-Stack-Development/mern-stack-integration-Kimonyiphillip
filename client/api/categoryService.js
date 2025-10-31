// client/src/api/categoryService.js
const API_URL = "http://localhost:5000/api/categories";

export const categoryService = {
  // Get all categories
  getAll: async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.data; // returns categories array
  },

  // Create new category (for admin use)
  create: async (category) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    return data;
  },
};
