// // src/context/ThemeContext.jsx
// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

//   useEffect(() => {
//     const html = document.documentElement;
//     if (theme === 'dark') html.classList.add('dark');
//     else html.classList.remove('dark');
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// src/context/ThemeContext.jsx
// src/context/ThemeContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // default from localStorage or system preference
  const getInitial = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark" ? "dark" : "light";
    // fallback to OS preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
