// // src/components/Navbar.jsx
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { ThemeContext } from "../context/ThemeContext";

// export default function Navbar() {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/80 shadow-sm border-b border-gray-200 dark:border-gray-700">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Brand */}
//         <Link
//           to="/"
//           className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-white"
//         >
//           MERN<span className="text-green-600">Blog</span>
//         </Link>

//         {/* Nav Links */}
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/"
//             className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
//           >
//             Home
//           </Link>

//           <Link
//             to="/create"
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//           >
//             + Create Post
//           </Link>

//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="ml-3 p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             title="Toggle theme"
//           >
//             {theme === "light" ? (
//               <span className="text-xl">🌙</span>
//             ) : (
//               <span className="text-xl">☀️</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/80 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-gray-800 dark:text-white">
          MERN<span className="text-green-600">Blog</span>
        </Link>

        <div className="flex items-center space-x-3">
          <Link to="/" className="px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
            Home
          </Link>

          <Link to="/create" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
            + Create Post
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-3 p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              // Sun icon for light
              <span className="text-xl" role="img" aria-label="light">☀️</span>
            ) : (
              // Moon icon for dark
              <span className="text-xl" role="img" aria-label="dark">🌙</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
