import React from 'react';
import { useMovieStore } from '../../store/useMovieStore';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function ModalConfirm() {
  const { isOpen, movie } = useMovieStore((state) => state.deleteModal);
  const closeDeleteModal = useMovieStore((state) => state.closeDeleteModal);
  const deleteMovie = useMovieStore((state) => state.deleteMovie);
  const isMutating = useMovieStore((state) => state.isMutating);

  if (!isOpen || !movie) return null;

  const handleDelete = async () => {
    await deleteMovie(movie.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeDeleteModal}
          disabled={isMutating}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900">¿Eliminar título?</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Esta acción eliminará el título de la cartelera de forma permanente.
            </p>
          </div>
        </div>

        {/* Movie Preview */}
        <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-12 h-16 object-cover rounded-lg shrink-0 border border-slate-200"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 truncate text-sm">{movie.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {movie.type === 'serie' ? 'Serie' : 'Película'} • {movie.year} • ⭐ {movie.rating}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeDeleteModal}
            disabled={isMutating}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isMutating}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-sm flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
          >
            {isMutating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Eliminar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
