import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, Star, Heart, Bookmark, Edit3, Trash2, ArrowLeft, 
  Calendar, Clock, Globe, User, Users 
} from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';
import { formatDuration, getRatingBadgeClass, getStatusBadgeClass } from '../utils/formatters';
import { confirmDeleteAlert } from '../utils/alerts';
import MovieCard from '../components/movies/MovieCard';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movies = useMovieStore((state) => state.movies);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const openTrailer = useMovieStore((state) => state.openTrailer);
  const deleteMovie = useMovieStore((state) => state.deleteMovie);
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

  const handleDelete = async () => {
    if (!movie) return;
    const confirmed = await confirmDeleteAlert(movie.title, movie.poster);
    if (confirmed) {
      await deleteMovie(movie.id);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-xs">Cargando detalles...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto border border-slate-200 my-10 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Película no encontrada</h2>
        <p className="text-slate-500 text-xs mb-5">
          Este título no existe o fue eliminado.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(movie.id);
  const isWatchlist = watchlist.includes(movie.id);

  // Recommendations
  const relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genres?.some((g) => movie.genres?.includes(g)))
    .slice(0, 4);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Volver</span>
      </button>

      {/* Main Detail Header Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
        {/* Content Layout */}
        <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Poster Column (4 cols) */}
          <div className="md:col-span-4 lg:col-span-3 max-w-[260px] mx-auto md:max-w-none w-full">
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 group bg-slate-100">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <button
                onClick={() => openTrailer(movie)}
                className="absolute inset-0 m-auto w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center transition-all hover:scale-108 shadow-md"
                title="Reproducir Trailer"
              >
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => toggleFavorite(movie.id)}
                className={`py-2 px-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                <span>Favorito</span>
              </button>

              <button
                onClick={() => toggleWatchlist(movie.id)}
                className={`py-2 px-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  isWatchlist
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isWatchlist ? 'fill-indigo-500' : ''}`} />
                <span>Por Ver</span>
              </button>
            </div>
          </div>

          {/* Details Column (8 cols) */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            <div>
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {movie.type === 'serie' ? 'Serie' : 'Película'}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${getStatusBadgeClass(movie.status)}`}>
                  {movie.status}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getRatingBadgeClass(movie.rating)}`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {movie.rating} / 10
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] tracking-tight">
                {movie.title}
              </h1>

              {/* Meta stats bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500 mt-2">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{formatDuration(movie.duration)}</span>
                <span>•</span>
                <span>{movie.language || 'Español'}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {movie.genres?.map((g) => (
                <span
                  key={g}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Sinopsis
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                {movie.synopsis}
              </p>
            </div>

            {/* Director and Cast Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {movie.director && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Director</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">{movie.director}</p>
                </div>
              )}

              {Array.isArray(movie.cast) && movie.cast.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Reparto</span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800">{movie.cast.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => openTrailer(movie)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Ver Trailer</span>
              </button>

              <div className="flex items-center gap-2 justify-end">
                <Link
                  to={`/edit/${movie.id}`}
                  className="flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </Link>

                <button
                  onClick={handleDelete}
                  className="flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Titles Section */}
      {relatedMovies.length > 0 && (
        <div className="pt-2">
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-4">
            Películas similares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedMovies.map((rel) => (
              <MovieCard key={rel.id} movie={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
