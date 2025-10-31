// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} MERN Blog — build by phillip kim
      </div>
      <div className='text-center mb-4'>
        <p>All rights reserved </p>
      </div>
    </footer>
  );
}
