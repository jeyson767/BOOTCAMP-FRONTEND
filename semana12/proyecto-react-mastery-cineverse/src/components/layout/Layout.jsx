import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TrailerModal from '../common/TrailerModal';
import ModalConfirm from '../common/ModalConfirm';
import ToastContainer from '../common/ToastContainer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 relative selection:bg-red-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-red-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[350px] bg-sky-600/5 blur-[110px] rounded-full" />
      </div>

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <TrailerModal />
      <ModalConfirm />
      <ToastContainer />
    </div>
  );
}
