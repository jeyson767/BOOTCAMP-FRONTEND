import React from 'react';
import { Film, Github, Heart, Code2, RotateCcw } from 'lucide-react';
import { useMovieStore } from '../../store/useMovieStore';
import { confirmResetAlert } from '../../utils/alerts';

export default function Footer() {
  const resetDatabase = useMovieStore((state) => state.resetDatabase);

  const handleReset = async () => {
    const confirmed = await confirmResetAlert();
    if (confirmed) {
      await resetDatabase();
    }
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 mt-20 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white font-['Outfit']">
                CINE<span className="text-red-500">VERSE</span>
              </span>
              <p className="text-xs text-slate-400">
                Semana 12 • Proyecto Final React Mastery (CRUD + Asincronía)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              ⚛️ React 18
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              ⚡ Vite
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🐻 Zustand State
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🧭 React Router DOM
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🎨 TailwindCSS
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🍬 SweetAlert2
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Restaurar películas de muestra"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Datos</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} CineVerse CRUD App. Proyecto de Evaluación Frontend.</p>
          <p className="flex items-center gap-1">
            Construido con <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> para el Bootcamp Frontend
          </p>
        </div>
      </div>
    </footer>
  );
}
