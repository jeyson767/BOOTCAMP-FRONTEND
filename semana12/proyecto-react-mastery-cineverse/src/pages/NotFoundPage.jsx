import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[55vh] flex items-center justify-center animate-fade-in py-12">
      <div className="bg-white rounded-3xl p-10 sm:p-12 text-center max-w-md border border-slate-200/80 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-5">
          <Film className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Error 404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
          Página no encontrada
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
          El enlace al que intentas acceder no existe o fue movido.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all hover:scale-105"
        >
          <Home className="w-4 h-4" />
          Volver al Catálogo
        </Link>
      </div>
    </div>
  );
}
