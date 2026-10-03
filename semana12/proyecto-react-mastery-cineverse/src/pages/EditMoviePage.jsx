import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/useMovieStore';
import MovieForm from '../components/movies/MovieForm';
import { Loader2 } from 'lucide-react';

export default function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movies = useMovieStore((state) => state.movies);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const updateMovie = useMovieStore((state) => state.updateMovie);
  const isMutating = useMovieStore((state) => state.isMutating);

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

  const handleUpdate = async (formData) => {
    try {
      await updateMovie(id, formData);
      navigate(`/movie/${id}`);
    } catch (error) {
      console.error('Error actualizando película:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-slate-400 text-sm">Cargando datos...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center max-w-md mx-auto border border-slate-200/80 shadow-sm my-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">No se encontró el título</h2>
        <p className="text-slate-500 text-sm mb-6">
          No se puede editar un registro que no existe.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <MovieForm
        initialData={movie}
        onSubmit={handleUpdate}
        isEditing={true}
        isLoading={isMutating}
      />
    </div>
  );
}
