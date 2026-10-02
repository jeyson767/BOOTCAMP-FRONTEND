import React, { useEffect } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import { 
  Film, Tv, Star, Clock, Heart, Award, TrendingUp, 
  BarChart2, PieChart, Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_GENRES } from '../services/mockData';
import { formatDuration } from '../utils/formatters';

export default function DashboardPage() {
  const movies = useMovieStore((state) => state.movies);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [fetchMovies, movies.length]);

  // Calculations
  const totalMovies = movies.filter((m) => m.type !== 'serie').length;
  const totalSeries = movies.filter((m) => m.type === 'serie').length;
  const totalMinutes = movies.reduce((acc, m) => acc + (parseInt(m.duration, 10) || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const avgRating = movies.length > 0 
    ? (movies.reduce((acc, m) => acc + (parseFloat(m.rating) || 0), 0) / movies.length).toFixed(2)
    : 0;

  // Genre breakdown
  const genreCounts = ALL_GENRES.map((genre) => {
    const count = movies.filter((m) => m.genres?.includes(genre)).length;
    return { genre, count };
  }).filter((item) => item.count > 0).sort((a, b) => b.count - a.count);

  // Top rated movies
  const topRated = [...movies]
    .sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0))
    .slice(0, 5);

  return (
    <div className="animate-fade-in space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-red-500" />
            Dashboard & Métricas
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Análisis estadístico en tiempo real del catálogo sincronizado
          </p>
        </div>

        <Link
          to="/create"
          className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 transition-all"
        >
          + Agregar Nuevo Título
        </Link>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Titles */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Títulos</span>
            <h3 className="text-3xl font-black text-white font-['Outfit'] mt-1">{movies.length}</h3>
            <span className="text-xs text-emerald-400 font-medium">Sincronizados en LocalStorage</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-600/15 text-red-500 border border-red-500/20">
            <Film className="w-6 h-6" />
          </div>
        </div>

        {/* Películas vs Series */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Películas / Series</span>
            <h3 className="text-3xl font-black text-white font-['Outfit'] mt-1">
              {totalMovies} <span className="text-slate-500 text-lg">/</span> {totalSeries}
            </h3>
            <span className="text-xs text-slate-400">
              {((totalMovies / (movies.length || 1)) * 100).toFixed(0)}% Películas • {((totalSeries / (movies.length || 1)) * 100).toFixed(0)}% Series
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-600/15 text-purple-400 border border-purple-500/20">
            <Tv className="w-6 h-6" />
          </div>
        </div>

        {/* Promedio Calificación */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Promedio IMDb</span>
            <h3 className="text-3xl font-black text-amber-400 font-['Outfit'] mt-1 flex items-center gap-1.5">
              ⭐ {avgRating} <span className="text-xs text-slate-400 font-normal">/ 10</span>
            </h3>
            <span className="text-xs text-amber-400/80 font-medium">Calidad de catálogo alta</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
        </div>

        {/* Tiempo Total de Reproducción */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiempo de Contenido</span>
            <h3 className="text-3xl font-black text-white font-['Outfit'] mt-1">{totalHours} hrs</h3>
            <span className="text-xs text-sky-400 font-medium">{totalMinutes.toLocaleString()} minutos acumulados</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-sky-600/15 text-sky-400 border border-sky-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Charts & Rankings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Genre Distribution Bars (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Distribución por Géneros
              </h3>
            </div>
            <span className="text-xs text-slate-400">{genreCounts.length} géneros representados</span>
          </div>

          <div className="space-y-4">
            {genreCounts.map(({ genre, count }) => {
              const percentage = Math.round((count / (movies.length || 1)) * 100);
              return (
                <div key={genre} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{genre}</span>
                    <span className="text-slate-400">
                      {count} {count === 1 ? 'título' : 'títulos'} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Rated Leaderboard (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-6">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Top 5 Títulos Mejor Calificados
            </h3>
          </div>

          <div className="space-y-3">
            {topRated.map((m, index) => (
              <Link
                key={m.id}
                to={`/movie/${m.id}`}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/60 group"
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  index === 0 ? 'bg-amber-500 text-slate-950 font-bold' :
                  index === 1 ? 'bg-slate-300 text-slate-950 font-bold' :
                  index === 2 ? 'bg-amber-700 text-white font-bold' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  #{index + 1}
                </span>

                <img
                  src={m.poster}
                  alt={m.title}
                  className="w-10 h-14 object-cover rounded-lg shrink-0 border border-slate-800"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-white truncate group-hover:text-red-400 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {m.year} • {m.type === 'serie' ? 'Serie' : 'Película'}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg shrink-0">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {m.rating}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
