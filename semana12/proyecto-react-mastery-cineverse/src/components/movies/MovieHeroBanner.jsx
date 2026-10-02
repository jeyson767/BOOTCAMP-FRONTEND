import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star, Heart, Bookmark, Flame } from 'lucide-react';
import { useMovieStore } from '../../store/useMovieStore';
import { formatDuration } from '../../utils/formatters';

export default function MovieHeroBanner({ movie }) {
  const openTrailer = useMovieStore((state) => state.openTrailer);
  const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
  const toggleWatchlist = useMovieStore((state) => state.toggleWatchlist);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  if (!movie) return null;

  const isFavorite = favorites.includes(movie.id);
  const isWatchlist = watchlist.includes(movie.id);

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl mb-8 sm:mb-12 group">
      {/* Background Backdrop with responsive gradients */}
      <div className="absolute inset-0 bg-slate-950">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-40 md:opacity-50"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80';
          }}
        />
        {/* Layered gradients for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14] via-[#0a0d14]/80 md:via-[#0a0d14]/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-5 sm:p-8 md:p-12 max-w-3xl flex flex-col justify-end min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
        {/* Spotlight Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-600/25 text-red-400 border border-red-500/30 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Título Destacado
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
            {movie.type === 'serie' ? 'Serie de TV' : 'Película'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-['Outfit'] drop-shadow-md leading-tight">
          {movie.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-300 mt-2 sm:mt-3 font-medium">
          <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-amber-400/20">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{movie.rating} / 10</span>
          </div>
          <span>•</span>
          <span>{movie.year}</span>
          <span>•</span>
          <span>{formatDuration(movie.duration)}</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">{movie.genres?.join(', ')}</span>
        </div>

        {/* Synopsis snippet */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 mt-3 text-balance leading-relaxed">
          {movie.synopsis}
        </p>

        {/* Call to Actions - responsive layout */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mt-5 sm:mt-6">
          <button
            onClick={() => openTrailer(movie)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-600/30 transition-all active:scale-95 border border-red-500/40"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Ver Trailer</span>
          </button>

          <Link
            to={`/movie/${movie.id}`}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700/80 backdrop-blur-md transition-all"
          >
            <Info className="w-4 h-4" />
            <span>Detalles</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`p-3 rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all ${
                isFavorite
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/40'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
              }`}
              title={isFavorite ? 'En tus favoritos' : 'Añadir a favoritos'}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-3 rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all ${
                isWatchlist
                  ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/40'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
              }`}
              title={isWatchlist ? 'Guardado en Ver Más Tarde' : 'Ver más tarde'}
            >
              <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isWatchlist ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
