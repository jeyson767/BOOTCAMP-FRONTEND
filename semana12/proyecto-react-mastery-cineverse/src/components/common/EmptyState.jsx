import React from 'react';
import { Film, Plus, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '../../store/useMovieStore';

export default function EmptyState({ 
  title = "No se encontraron títulos", 
  description = "Prueba ajustando los filtros de búsqueda o restableciendo los criterios.",
  showReset = true
}) {
  const setSearchQuery = useMovieStore((state) => state.setSearchQuery);
  const setSelectedGenre = useMovieStore((state) => state.setSelectedGenre);
  const setSelectedType = useMovieStore((state) => state.setSelectedType);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('Todos');
    setSelectedType('all');
  };

  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-md mx-auto border border-slate-200/80 shadow-sm my-8">
      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100">
        <Film className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {showReset && (
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpiar Filtros
          </button>
        )}
        <Link
          to="/create"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Título
        </Link>
      </div>
    </div>
  );
}
