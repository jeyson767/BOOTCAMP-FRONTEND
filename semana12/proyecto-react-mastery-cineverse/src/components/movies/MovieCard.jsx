import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Heart, Bookmark, Edit3, Trash2, Clock, Calendar } from 'lucide-react';
import { useMovieStore } from '../../store/useMovieStore';
import { formatDuration, getRatingBadgeClass } from '../../utils/formatters';
import { confirmDeleteAlert } from '../../utils/alerts';

export default function MovieCard({ movie, viewMode = 'grid' }) {
  const openTrailer = useMovieStore((state) => state.openTrailer);
  const deleteMovie = useMovieStore((state) => state.deleteMovie);
  const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
  const toggleWatchlist = useMovieStore((state) => state.toggleWatchlist);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  const isFavorite = favorites.includes(movie.id);
  const isWatchlist = watchlist.includes(movie.id);

  const handleDelete = async () => {
    const confirmed = await confirmDeleteAlert(movie.title, movie.poster);
    if (confirmed) {
      await deleteMovie(movie.id);
    }
  };

  if (viewMode === 'compact') {
    return (
      <div className="glass-card glass-card-hover rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 group border border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-20 sm:w-28 h-28 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <button
              onClick={() => openTrailer(movie)}
              className="absolute inset-0 m-auto w-9 h-9 sm:w-10 sm:h-10 bg-red-600/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-lg shadow-red-600/50"
              title="Ver Trailer"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
            </button>
          </div>

          <div className="flex-1 sm:hidden min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {movie.type === 'serie' ? 'Serie' : 'Película'}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${getRatingBadgeClass(movie.rating)}`}>
                <Star className="w-2.5 h-2.5 fill-current" />
                {movie.rating}
              </span>
            </div>
            <Link
              to={`/movie/${movie.id}`}
              className="font-bold text-sm text-white hover:text-red-400 transition-colors line-clamp-1 block"
            >
              {movie.title}
            </Link>
            <span className="text-[11px] text-slate-400">{movie.year} • {formatDuration(movie.duration)}</span>
          </div>
        </div>

        <div className="hidden sm:block flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {movie.type === 'serie' ? 'Serie' : 'Película'}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getRatingBadgeClass(movie.rating)}`}>
              <Star className="w-3 h-3 fill-current" />
              {movie.rating}
            </span>
            <span className="text-xs text-slate-400">{movie.year} • {formatDuration(movie.duration)}</span>
          </div>

          <Link
            to={`/movie/${movie.id}`}
            className="font-bold text-base sm:text-lg text-white hover:text-red-400 transition-colors line-clamp-1"
          >
            {movie.title}
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {movie.synopsis || 'Sin descripción disponible.'}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {movie.genres?.slice(0, 3).map((g) => (
              <span key={g} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons toolbar */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
          <Link
            to={`/movie/${movie.id}`}
            className="sm:hidden text-xs font-bold text-red-400 hover:text-red-300 py-1"
          >
            Ver Detalles →
          </Link>

          <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorite
                  ? 'bg-rose-600/20 text-rose-400 border-rose-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isWatchlist
                  ? 'bg-amber-600/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
              }`}
              title={isWatchlist ? 'Quitar de lista' : 'Guardar en lista'}
            >
              <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWatchlist ? 'fill-amber-500' : ''}`} />
            </button>
            
            <Link
              to={`/edit/${movie.id}`}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Editar título"
            >
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <button
              onClick={handleDelete}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-600/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30 transition-colors"
              title="Eliminar título"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode
  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group border border-slate-800/80">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between z-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/60 shadow-lg">
            {movie.type === 'serie' ? 'Serie' : 'Película'}
          </span>

          <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border backdrop-blur-md shadow-lg flex items-center gap-1 ${getRatingBadgeClass(movie.rating)}`}>
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            {movie.rating}
          </span>
        </div>

        {/* Play Trailer Floating Button */}
        <button
          onClick={() => openTrailer(movie)}
          className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 bg-red-600/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl shadow-red-600/60 z-10"
          title="Ver Trailer Oficial"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
        </button>

        {/* Quick action buttons */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => toggleFavorite(movie.id)}
            className={`p-1.5 sm:p-2 rounded-xl backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 scale-105'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
            }`}
            title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => toggleWatchlist(movie.id)}
            className={`p-1.5 sm:p-2 rounded-xl backdrop-blur-md transition-all ${
              isWatchlist
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/50 scale-105'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
            }`}
            title={isWatchlist ? 'Quitar de Ver Más Tarde' : 'Guardar en Ver Más Tarde'}
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWatchlist ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {movie.year}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(movie.duration)}
            </span>
          </div>

          <Link
            to={`/movie/${movie.id}`}
            className="font-bold text-sm sm:text-base text-white hover:text-red-400 transition-colors line-clamp-1 block"
            title={movie.title}
          >
            {movie.title}
          </Link>

          {/* Genres Pills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Detail, Edit, Delete */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="text-[11px] sm:text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            Ver Ficha →
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={`/edit/${movie.id}`}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Editar"
            >
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
