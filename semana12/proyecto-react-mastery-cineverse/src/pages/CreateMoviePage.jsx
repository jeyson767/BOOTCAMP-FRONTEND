import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/useMovieStore';
import MovieForm from '../components/movies/MovieForm';
import confetti from 'canvas-confetti';

export default function CreateMoviePage() {
  const navigate = useNavigate();
  const addMovie = useMovieStore((state) => state.addMovie);
  const isMutating = useMovieStore((state) => state.isMutating);

  const handleCreate = async (movieData) => {
    try {
      const created = await addMovie(movieData);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore confetti errors
      }
      navigate(`/movie/${created.id}`);
    } catch (error) {
      console.error('Error al crear película:', error);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <MovieForm
        onSubmit={handleCreate}
        isEditing={false}
        isLoading={isMutating}
      />
    </div>
  );
}
