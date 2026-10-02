import React from 'react';
import { useMovieStore } from '../../store/useMovieStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const toast = useMovieStore((state) => state.toast);
  const clearToast = useMovieStore((state) => state.clearToast);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-emerald-950/80 text-emerald-100',
    error: 'border-rose-500/40 bg-rose-950/80 text-rose-100',
    info: 'border-sky-500/40 bg-slate-900/90 text-slate-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-md w-full px-4 sm:px-0 pointer-events-auto">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl shadow-black/80 ${
          borderColors[toast.type] || borderColors.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors hover:bg-white/10"
          title="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
