import React from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, X, Filter } from 'lucide-react';
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
    <div className="bg-white rounded-2xl p-3 sm:p-4 mb-6 border border-slate-200/80 shadow-xs space-y-3">
      {/* Top row: Search input & View switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, género o actor..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              title="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results count and View Mode Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs font-medium text-slate-500 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 sm:hidden">
            {totalResults} {totalResults === 1 ? 'título' : 'títulos'}
          </span>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-600 shadow-xs font-medium'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Vista en Cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'compact'
                  ? 'bg-white text-indigo-600 shadow-xs font-medium'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Vista en Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Filters and Sorts */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pt-2.5 border-t border-slate-100">
        
        {/* Type selector tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-x-auto">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedType === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedType('pelicula')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedType === 'pelicula'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Películas
          </button>
          <button
            onClick={() => setSelectedType('serie')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedType === 'serie'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Series
          </button>
        </div>

        {/* Right side: Genre & Sort */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          {/* Genre selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 rounded-xl border border-slate-200 px-2.5 py-1.5 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer w-full"
            >
              <option value="Todos">Todos los géneros</option>
              {ALL_GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 rounded-xl border border-slate-200 px-2.5 py-1.5 w-full sm:w-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer w-full"
            >
              <option value="rating-desc">⭐ Mejor valoradas</option>
              <option value="year-desc">📅 Más recientes</option>
              <option value="title-asc">🔤 Título (A - Z)</option>
              <option value="duration-desc">⏱️ Duración</option>
            </select>
          </div>

          {/* Results count desktop */}
          <span className="hidden sm:inline-block text-xs font-medium text-slate-500 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
            {totalResults} {totalResults === 1 ? 'título' : 'títulos'}
          </span>
        </div>
      </div>
    </div>
  );
}
