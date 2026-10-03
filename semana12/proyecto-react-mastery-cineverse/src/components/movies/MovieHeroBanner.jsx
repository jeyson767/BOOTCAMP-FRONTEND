import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star, Heart, Bookmark, Sparkles } from 'lucide-react';
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
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden light-card shadow-sm mb-8 sm:mb-10 group bg-slate-900 text-white">
      {/* Background Backdrop */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center opacity-40 group-hover:scale-102 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80';
          }}
        />
        {/* Soft gradient overlay for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 md:via-slate-950/50 to-transparent" />
      </div>

      {/* Hero Content - Clean & Minimal */}
      <div className="relative z-10 p-5 sm:p-8 md:p-10 max-w-2xl flex flex-col justify-end min-h-[340px] sm:min-h-[400px]">
        {/* Tag & Type */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-semibold">
            <Sparkles className="w-3 h-3" />
            Destacado
          </span>
          <span className="text-xs text-slate-300">
            {movie.type === 'serie' ? 'Serie' : 'Película'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-['Outfit'] leading-tight">
          {movie.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 mt-2 font-medium">
          <span className="flex items-center gap-1 text-amber-300 font-semibold bg-amber-500/20 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            {movie.rating}
          </span>
          <span>•</span>
          <span>{movie.year}</span>
          <span>•</span>
          <span>{formatDuration(movie.duration)}</span>
        </div>

        {/* Concise synopsis */}
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mt-2.5 leading-relaxed font-normal">
          {movie.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 mt-5">
          <button
            onClick={() => openTrailer(movie)}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Ver Trailer</span>
          </button>

          <Link
            to={`/movie/${movie.id}`}
            className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-sm border border-white/20 transition-all"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Detalles</span>
          </Link>

          <button
            onClick={() => toggleFavorite(movie.id)}
            className={`p-2.5 rounded-xl border backdrop-blur-sm transition-all ${
              isFavorite
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
            }`}
            title={isFavorite ? 'En favoritos' : 'Añadir a favoritos'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => toggleWatchlist(movie.id)}
            className={`p-2.5 rounded-xl border backdrop-blur-sm transition-all ${
              isWatchlist
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
            }`}
            title={isWatchlist ? 'En lista' : 'Ver más tarde'}
          >
            <Bookmark className={`w-4 h-4 ${isWatchlist ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
