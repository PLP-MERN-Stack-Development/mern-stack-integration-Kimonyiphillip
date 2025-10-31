// src/components/CategoryFilter.jsx
import React, { useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';

export default function CategoryFilter({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    categoryService.getAllCategories().then(data => {
      if (mounted) setCategories(data || []);
    }).catch(err => {
      console.error('Failed to load categories', err);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="mb-4 flex items-center gap-3">
      <label className="font-medium">Category</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || '')}
        className="border rounded px-3 py-2"
      >
        <option value="">All</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
    </div>
  );
}



// my comments for understanding the logic:( )
//1. When a user selects a category, onSelectCategory updates the
//  category state in Home.jsx, which triggers fetchPosts() again, showing filtered posts.
//2. the dropdown we have created here is populated dynamically by fetching 
// categories from the backend API using categoryService.getAllCategories