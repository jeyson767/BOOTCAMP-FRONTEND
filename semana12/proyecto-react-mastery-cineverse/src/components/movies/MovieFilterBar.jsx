import React from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { useMovieStore } from '../../store/useMovieStore';
import { ALL_GENRES } from '../../services/mockData';

export default function MovieFilterBar({ totalResults = 0 }) {
  const searchQuery = useMovieStore((state) => state.searchQuery);
  const setSearchQuery = useMovieStore((state) => state.setSearchQuery);
  const selectedGenre = useMovieStore((state) => state.selectedGenre);
  const setSelectedGenre = useMovieStore((state) => state.setSelectedGenre);
  const selectedType = useMovieStore((state) => state.selectedType);
  const setSelectedType = useMovieStore((state) => state.setSelectedType);
  const sortBy = useMovieStore((state) => state.sortBy);
  const setSortBy = useMovieStore((state) => state.setSortBy);
  const viewMode = useMovieStore((state) => state.viewMode);
  const setViewMode = useMovieStore((state) => state.setViewMode);

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8 border border-slate-800 space-y-4">
      {/* Top row: Search & View switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, director, actor o género..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md"
              title="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 self-end sm:self-center p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista en Cuadrícula"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'compact'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista en Lista Compacta"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom row: Filters and Sorts */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        
        {/* Type selector tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedType('pelicula')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === 'pelicula'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎬 Películas
          </button>
          <button
            onClick={() => setSelectedType('serie')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === 'serie'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📺 Series
          </button>
        </div>

        {/* Right side: Genre & Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Genre selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 rounded-xl border border-slate-800 px-3 py-1.5">
            <span className="text-xs text-slate-400">Género:</span>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="Todos" className="bg-slate-900 text-white">Todos los géneros</option>
              {ALL_GENRES.map((genre) => (
                <option key={genre} value={genre} className="bg-slate-900 text-white">
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 rounded-xl border border-slate-800 px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="rating-desc" className="bg-slate-900 text-white">⭐ Mejor Valoradas</option>
              <option value="year-desc" className="bg-slate-900 text-white">📅 Más Recientes</option>
              <option value="title-asc" className="bg-slate-900 text-white">🔤 Título (A - Z)</option>
              <option value="duration-desc" className="bg-slate-900 text-white">⏱️ Mayor Duración</option>
            </select>
          </div>

          {/* Results counter badge */}
          <span className="text-xs font-medium text-slate-400 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
            {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>
      </div>
    </div>
  );
}
