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
    <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-800 my-8">
      <div className="w-16 h-16 bg-red-600/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
        <Film className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-6">{description}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {showReset && (
          <button
            onClick={handleResetFilters}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors inline-flex items-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            Limpiar Filtros
          </button>
        )}
        <Link
          to="/create"
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-red-600/30"
        >
          <Plus className="w-4 h-4" />
          Añadir Nuevo Título
        </Link>
      </div>
    </div>
  );
}
