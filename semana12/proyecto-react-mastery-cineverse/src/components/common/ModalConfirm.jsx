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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl shadow-red-950/50 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeDeleteModal}
          disabled={isMutating}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-600/15 border border-red-500/30 rounded-xl text-red-500 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">¿Eliminar título?</h3>
            <p className="text-sm text-slate-400 mt-1">
              Esta acción no se puede deshacer. Se eliminará del catálogo permanentemente.
            </p>
          </div>
        </div>

        {/* Movie Preview */}
        <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-3">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-12 h-16 object-cover rounded-lg shrink-0 border border-slate-700/50"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div className="min-w-0">
            <p className="font-semibold text-white truncate text-sm">{movie.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {movie.type === 'serie' ? 'Serie' : 'Película'} • {movie.year} • ⭐ {movie.rating}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeDeleteModal}
            disabled={isMutating}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isMutating}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isMutating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Sí, Eliminar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
