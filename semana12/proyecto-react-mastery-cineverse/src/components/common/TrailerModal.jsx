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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/40 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-500">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg line-clamp-1">{title}</h3>
              <span className="text-xs text-slate-400">Trailer Oficial en YouTube</span>
            </div>
          </div>
          <button
            onClick={closeTrailer}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          {embedId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1`}
              title={`Trailer de ${title}`}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
              <p className="text-lg font-medium text-slate-300">No se proporcionó un enlace de YouTube válido.</p>
              <p className="text-sm mt-1 text-slate-500">Puedes editar este título y agregar una URL de trailer de YouTube.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
