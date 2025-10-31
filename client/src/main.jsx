// src/main.jsx
import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import './tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PostProvider } from './context/PostContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </ThemeProvider>
  </React.StrictMode>
);
