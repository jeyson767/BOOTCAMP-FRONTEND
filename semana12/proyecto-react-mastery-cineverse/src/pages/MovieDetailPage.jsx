import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, Star, Heart, Bookmark, Edit3, Trash2, ArrowLeft, 
  Calendar, Clock, Film, Globe, User, Users, CheckCircle2 
} from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';
import { formatDuration, getRatingBadgeClass, getStatusBadgeClass } from '../utils/formatters';
import MovieCard from '../components/movies/MovieCard';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movies = useMovieStore((state) => state.movies);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const openTrailer = useMovieStore((state) => state.openTrailer);
  const openDeleteModal = useMovieStore((state) => state.openDeleteModal);
  const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
  const toggleWatchlist = useMovieStore((state) => state.toggleWatchlist);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (movies.length === 0) {
        await fetchMovies();
      }
      setLoading(false);
    };
    loadData();
  }, [fetchMovies, movies.length]);

  useEffect(() => {
    if (movies.length > 0) {
      const found = movies.find((m) => String(m.id) === String(id));
      setMovie(found || null);
    }
  }, [id, movies]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando detalles cinematográficos...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-slate-800 my-12">
        <h2 className="text-2xl font-black text-white mb-2">Título No Encontrado</h2>
        <p className="text-slate-400 text-sm mb-6">
          La película o serie que buscas no existe o ha sido eliminada.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(movie.id);
  const isWatchlist = watchlist.includes(movie.id);

  // Recommendations: same genre, excluding current
  const relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genres?.some((g) => movie.genres?.includes(g)))
    .slice(0, 4);

  return (
    <div className="animate-fade-in space-y-8 sm:space-y-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Volver atrás</span>
      </button>

      {/* Main Detail Header Container */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-slate-800 shadow-2xl">
        {/* Backdrop Background */}
        <div className="absolute inset-0 bg-slate-950">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover opacity-25 md:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/80 to-transparent" />
        </div>

        {/* Content Layout */}
        <div className="relative z-10 p-5 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Poster Column (4 cols) */}
          <div className="md:col-span-4 lg:col-span-3 max-w-[280px] mx-auto md:max-w-none w-full">
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => openTrailer(movie)}
                className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 bg-red-600/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xl shadow-red-600/60"
                title="Reproducir Trailer"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
              </button>
            </div>

            {/* Quick Action Buttons Under Poster */}
            <div className="grid grid-cols-2 gap-2 mt-3.5">
              <button
                onClick={() => toggleFavorite(movie.id)}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isFavorite
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
                <span>{isFavorite ? 'Favorito' : 'Favorito'}</span>
              </button>

              <button
                onClick={() => toggleWatchlist(movie.id)}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isWatchlist
                    ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/30'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isWatchlist ? 'fill-white' : ''}`} />
                <span>{isWatchlist ? 'Guardado' : 'Por Ver'}</span>
              </button>
            </div>
          </div>

          {/* Details Column (8 cols) */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4 sm:space-y-6">
            <div>
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs uppercase font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 text-white border border-slate-700">
                  {movie.type === 'serie' ? 'Serie' : 'Película'}
                </span>
                <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border ${getStatusBadgeClass(movie.status)}`}>
                  {movie.status}
                </span>
                <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border flex items-center gap-1 ${getRatingBadgeClass(movie.rating)}`}>
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  {movie.rating} / 10
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit'] tracking-tight">
                {movie.title}
              </h1>

              {/* Meta stats bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400 mt-2 sm:mt-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                  {movie.year}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                  {formatDuration(movie.duration)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                  {movie.language || 'Español Latino'}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g}
                  className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl bg-slate-900 text-slate-200 border border-slate-700"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-1.5 sm:mb-2">
                Sinopsis
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            {/* Director and Cast Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
              {movie.director && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 mb-1">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                    <span className="font-bold uppercase tracking-wider">Dirección</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{movie.director}</p>
                </div>
              )}

              {Array.isArray(movie.cast) && movie.cast.length > 0 && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 mb-1">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="font-bold uppercase tracking-wider">Reparto Principal</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-200">{movie.cast.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Actions Bar: Edit, Delete, Trailer */}
            <div className="pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <button
                onClick={() => openTrailer(movie)}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Ver Trailer Oficial</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3 justify-end">
                <Link
                  to={`/edit/${movie.id}`}
                  className="flex-1 sm:flex-initial text-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Editar</span>
                </Link>

                <button
                  onClick={() => openDeleteModal(movie)}
                  className="flex-1 sm:flex-initial text-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Titles Section */}
      {relatedMovies.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mb-4 sm:mb-6">
            Títulos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedMovies.map((rel) => (
              <MovieCard key={rel.id} movie={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
