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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
        <p className="text-slate-400 text-sm">Cargando datos para edición...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-800 my-12">
        <h2 className="text-2xl font-black text-white mb-2">No se encontró el título</h2>
        <p className="text-slate-400 text-sm mb-6">
          No se puede editar un registro que no existe.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm shadow-lg"
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
