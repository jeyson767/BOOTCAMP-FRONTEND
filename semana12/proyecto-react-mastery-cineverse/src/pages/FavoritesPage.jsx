import React, { useState, useEffect } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import MovieCard from '../components/movies/MovieCard';
import { Heart, Bookmark, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' | 'watchlist'
  const movies = useMovieStore((state) => state.movies);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [fetchMovies, movies.length]);

  const favoriteMovies = movies.filter((m) => favorites.includes(m.id));
  const watchlistMovies = movies.filter((m) => watchlist.includes(m.id));

  const currentList = activeTab === 'favorites' ? favoriteMovies : watchlistMovies;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
          Colección Guardada
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tus películas favoritas y lista de reproducción
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all ${
            activeTab === 'favorites'
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Favoritos ({favoriteMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('watchlist')}
          className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all ${
            activeTab === 'watchlist'
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>Por Ver ({watchlistMovies.length})</span>
        </button>
      </div>

      {/* Items Grid or Empty */}
      {currentList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 sm:p-10 text-center max-w-sm mx-auto border border-slate-200 my-8 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            {activeTab === 'favorites' ? <Heart className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {activeTab === 'favorites' ? 'Sin favoritos' : 'Lista vacía'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {activeTab === 'favorites'
              ? 'Guarda películas con el icono de corazón.'
              : 'Agrega títulos que deseas ver después.'}
          </p>
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
          >
            <Film className="w-3.5 h-3.5" />
            Explorar Catálogo
          </Link>
        </div>
      )}
    </div>
  );
}
