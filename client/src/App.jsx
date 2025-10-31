// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
// A simple app structure with Navbar, Footer, and routing for Home, SinglePost, and CreatePost pages.