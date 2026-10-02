import React, { useEffect, useMemo } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import MovieHeroBanner from '../components/movies/MovieHeroBanner';
import MovieFilterBar from '../components/movies/MovieFilterBar';
import MovieCard from '../components/movies/MovieCard';
import { GridSkeleton, HeroBannerSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export default function HomePage() {
  const movies = useMovieStore((state) => state.movies);
  const isLoading = useMovieStore((state) => state.isLoading);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const searchQuery = useMovieStore((state) => state.searchQuery);
  const selectedGenre = useMovieStore((state) => state.selectedGenre);
  const selectedType = useMovieStore((state) => state.selectedType);
  const sortBy = useMovieStore((state) => state.sortBy);
  const viewMode = useMovieStore((state) => state.viewMode);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [fetchMovies, movies.length]);

  // Filter & Sort Logic
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = movie.title?.toLowerCase().includes(q);
          const matchDirector = movie.director?.toLowerCase().includes(q);
          const matchCast = Array.isArray(movie.cast) && movie.cast.some((c) => c.toLowerCase().includes(q));
          const matchGenre = Array.isArray(movie.genres) && movie.genres.some((g) => g.toLowerCase().includes(q));
          if (!matchTitle && !matchDirector && !matchCast && !matchGenre) {
            return false;
          }
        }

        // Type filter
        if (selectedType !== 'all') {
          if (movie.type !== selectedType) return false;
        }

        // Genre filter
        if (selectedGenre !== 'Todos') {
          if (!Array.isArray(movie.genres) || !movie.genres.includes(selectedGenre)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'year-desc') return (b.year || 0) - (a.year || 0);
        if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
        if (sortBy === 'duration-desc') return (b.duration || 0) - (a.duration || 0);
        return 0;
      });
  }, [movies, searchQuery, selectedGenre, selectedType, sortBy]);

  const featuredMovie = useMemo(() => {
    return movies.find((m) => m.featured) || movies[0];
  }, [movies]);

  return (
    <div className="animate-fade-in">
      {/* Featured Spotlight Banner */}
      {isLoading ? (
        <HeroBannerSkeleton />
      ) : (
        featuredMovie && !searchQuery && selectedGenre === 'Todos' && selectedType === 'all' && (
          <MovieHeroBanner movie={featuredMovie} />
        )
      )}

      {/* Catalog Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] flex items-center gap-2">
              Explorar Catálogo
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Películas, series y producciones cinematográficas en streaming
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <MovieFilterBar totalResults={filteredMovies.length} />

        {/* Content list */}
        {isLoading ? (
          <GridSkeleton count={8} />
        ) : filteredMovies.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No se encontraron coincidencias"
            description="Ninguna película o serie coincide con tu búsqueda o filtros actuales."
          />
        )}
      </div>
    </div>
  );
}
