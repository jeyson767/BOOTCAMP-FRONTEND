import React, { useEffect } from 'react';
import { useMovieStore } from '../../store/useMovieStore';
import { X, Film } from 'lucide-react';
import { extractYoutubeId } from '../../utils/formatters';

export default function TrailerModal() {
  const { isOpen, title, youtubeId } = useMovieStore((state) => state.activeTrailer);
  const closeTrailer = useMovieStore((state) => state.closeTrailer);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeTrailer();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeTrailer]);

  if (!isOpen) return null;

  const embedId = extractYoutubeId(youtubeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{title}</h3>
              <span className="text-xs text-slate-400">Trailer Oficial</span>
            </div>
          </div>
          <button
            onClick={closeTrailer}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-slate-900">
          {embedId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1`}
              title={`Trailer de ${title}`}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-50">
              <p className="text-sm font-medium text-slate-600">No se proporcionó un enlace de YouTube válido.</p>
              <p className="text-xs mt-1 text-slate-400">Puedes editar este título y agregar una URL de trailer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
