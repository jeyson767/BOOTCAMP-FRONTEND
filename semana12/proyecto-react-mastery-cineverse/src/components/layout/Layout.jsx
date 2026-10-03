import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TrailerModal from '../common/TrailerModal';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 relative selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {children}
      </main>

      <Footer />

      {/* Global Trailer Video Modal */}
      <TrailerModal />
    </div>
  );
}
