import React from 'react';
import { Film, RotateCcw } from 'lucide-react';
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
    <footer className="w-full border-t border-slate-200 bg-white mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Film className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-700 font-['Outfit']">CineVerse</span>
            <span>•</span>
            <span>CRUD de Películas y Series</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Restaurar películas por defecto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer Datos</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
