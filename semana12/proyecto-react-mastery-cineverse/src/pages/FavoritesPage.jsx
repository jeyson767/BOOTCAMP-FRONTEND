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
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          Mi Colección Personal
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Tus títulos favoritos y lista de reproducción guardada
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeTab === 'favorites'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Favoritos ({favoriteMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('watchlist')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeTab === 'watchlist'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
          <span>Ver Más Tarde ({watchlistMovies.length})</span>
        </button>
      </div>

      {/* Items Grid or Empty */}
      {currentList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-800 my-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
            {activeTab === 'favorites' ? <Heart className="w-7 h-7" /> : <Bookmark className="w-7 h-7" />}
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            {activeTab === 'favorites' ? 'Sin favoritos aún' : 'Tu lista para ver está vacía'}
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            {activeTab === 'favorites'
              ? 'Haz clic en el icono del corazón en cualquier película para guardarla aquí.'
              : 'Guarda las películas que deseas ver luego con el icono de marcador.'}
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <Film className="w-4 h-4" />
            Explorar Catálogo
          </Link>
        </div>
      )}
    </div>
  );
}
