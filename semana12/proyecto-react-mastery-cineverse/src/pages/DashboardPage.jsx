import React, { useEffect } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import { 
  Film, Tv, Star, Clock, Award, 
  BarChart2, Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_GENRES } from '../services/mockData';
import { formatDuration } from '../utils/formatters';

export default function DashboardPage() {
  const movies = useMovieStore((state) => state.movies);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);

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
    ? (movies.reduce((acc, m) => acc + (parseFloat(m.rating) || 0), 0) / movies.length).toFixed(1)
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
    <div className="animate-fade-in space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-indigo-600" />
            Métricas del Catálogo
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Estadísticas y resumen de tus películas y series
          </p>
        </div>

        <Link
          to="/create"
          className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs transition-all"
        >
          + Añadir Título
        </Link>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Titles */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Títulos</span>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">{movies.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Film className="w-5 h-5" />
          </div>
        </div>

        {/* Películas vs Series */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Películas / Series</span>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">
              {totalMovies} <span className="text-slate-400 text-lg font-normal">/</span> {totalSeries}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-violet-50 text-violet-600">
            <Tv className="w-5 h-5" />
          </div>
        </div>

        {/* Promedio Calificación */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Promedio</span>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit'] mt-1 flex items-center gap-1">
              ⭐ {avgRating}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
        </div>

        {/* Tiempo Total de Reproducción */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duración Total</span>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">{totalHours} hrs</h3>
          </div>
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Charts & Rankings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Genre Distribution Bars (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                Distribución por Géneros
              </h3>
            </div>
            <span className="text-xs text-slate-400">{genreCounts.length} géneros</span>
          </div>

          <div className="space-y-3">
            {genreCounts.map(({ genre, count }) => {
              const percentage = Math.round((count / (movies.length || 1)) * 100);
              return (
                <div key={genre} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700">{genre}</span>
                    <span className="text-slate-500">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Rated Leaderboard (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
              Mejor Calificadas
            </h3>
          </div>

          <div className="space-y-2">
            {topRated.map((m, index) => (
              <Link
                key={m.id}
                to={`/movie/${m.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  index === 0 ? 'bg-amber-100 text-amber-800' :
                  index === 1 ? 'bg-slate-200 text-slate-700' :
                  index === 2 ? 'bg-amber-50 text-amber-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {index + 1}
                </span>

                <img
                  src={m.poster}
                  alt={m.title}
                  className="w-8 h-11 object-cover rounded-md shrink-0 border border-slate-200"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {m.year} • {m.type === 'serie' ? 'Serie' : 'Película'}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md shrink-0">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
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
