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
      <div className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 group border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-18 sm:w-24 h-24 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-xs">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <button
              onClick={() => openTrailer(movie)}
              className="absolute inset-0 m-auto w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-md"
              title="Ver Trailer"
            >
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </button>
          </div>

          <div className="flex-1 sm:hidden min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                {movie.type === 'serie' ? 'Serie' : 'Película'}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${getRatingBadgeClass(movie.rating)}`}>
                <Star className="w-2.5 h-2.5 fill-current" />
                {movie.rating}
              </span>
            </div>
            <Link
              to={`/movie/${movie.id}`}
              className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1 block"
            >
              {movie.title}
            </Link>
            <span className="text-[11px] text-slate-500">{movie.year} • {formatDuration(movie.duration)}</span>
          </div>
        </div>

        <div className="hidden sm:block flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {movie.type === 'serie' ? 'Serie' : 'Película'}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getRatingBadgeClass(movie.rating)}`}>
              <Star className="w-3 h-3 fill-current" />
              {movie.rating}
            </span>
            <span className="text-xs text-slate-500">{movie.year} • {formatDuration(movie.duration)}</span>
          </div>

          <Link
            to={`/movie/${movie.id}`}
            className="font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
          >
            {movie.title}
          </Link>

          <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-normal">
            {movie.synopsis}
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres?.slice(0, 3).map((g) => (
              <span key={g} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <Link
            to={`/movie/${movie.id}`}
            className="sm:hidden text-xs font-semibold text-indigo-600 hover:text-indigo-700 py-1"
          >
            Ver Detalles →
          </Link>

          <div className="flex items-center gap-1 ml-auto sm:ml-0">
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-2 rounded-xl transition-colors ${
                isWatchlist
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isWatchlist ? 'Quitar de lista' : 'Guardar en lista'}
            >
              <Bookmark className={`w-4 h-4 ${isWatchlist ? 'fill-indigo-500' : ''}`} />
            </button>
            
            <Link
              to={`/edit/${movie.id}`}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Editar título"
            >
              <Edit3 className="w-4 h-4" />
            </Link>

            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Eliminar título"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-400"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
          }}
        />

        {/* Soft overlay on top for badges */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/90 text-slate-800 backdrop-blur-sm shadow-xs">
            {movie.type === 'serie' ? 'Serie' : 'Película'}
          </span>

          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-xs flex items-center gap-1 ${getRatingBadgeClass(movie.rating)}`}>
            <Star className="w-3 h-3 fill-current" />
            {movie.rating}
          </span>
        </div>

        {/* Play Trailer Button */}
        <button
          onClick={() => openTrailer(movie)}
          className="absolute inset-0 m-auto w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:scale-108 shadow-md z-10"
          title="Ver Trailer"
        >
          <Play className="w-5 h-5 fill-white ml-0.5" />
        </button>

        {/* Quick action buttons */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={() => toggleFavorite(movie.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-xs ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
            title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => toggleWatchlist(movie.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-xs ${
              isWatchlist
                ? 'bg-indigo-600 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
            title={isWatchlist ? 'Quitar de lista' : 'Guardar en lista'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isWatchlist ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
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
            className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1 block"
            title={movie.title}
          >
            {movie.title}
          </Link>

          {/* Genres Pills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Detail, Edit, Delete */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Detalles →
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={`/edit/${movie.id}`}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Editar"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
