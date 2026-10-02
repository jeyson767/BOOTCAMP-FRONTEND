import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in py-12">
      <div className="glass-card rounded-3xl p-10 sm:p-14 text-center max-w-lg border border-slate-800 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-red-600/15 text-red-500 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <Film className="w-10 h-10" />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest text-red-500">Error 404</span>
        <h1 className="text-4xl font-black text-white font-['Outfit'] mt-2 mb-3">
          Escena No Encontrada
        </h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          La página que intentas reproducir no existe o ha sido movida fuera del set de grabación.
        </p>
        <Link
          to="/"
          className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 inline-flex items-center gap-2 transition-all hover:scale-105"
        >
          <Home className="w-4 h-4" />
          Regresar a la Cartelera
        </Link>
      </div>
    </div>
  );
}
