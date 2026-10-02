import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Film, Plus, Heart, BarChart3, Menu, X, Sparkles } from 'lucide-react';
import { useMovieStore } from '../../store/useMovieStore';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  const totalSaved = favorites.length + watchlist.length;

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-red-600/15 text-red-400 border border-red-500/30'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit'] flex items-center gap-1.5">
              CINE<span className="text-red-500">VERSE</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 ml-1">
                PRO
              </span>
            </span>
            <span className="block text-[11px] text-slate-400 -mt-1 font-medium">
              React Mastery Project
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClasses}>
            <Film className="w-4 h-4" />
            <span>Catálogo</span>
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClasses}>
            <BarChart3 className="w-4 h-4" />
            <span>Métricas & Dashboard</span>
          </NavLink>

          <NavLink to="/favorites" className={navLinkClasses}>
            <Heart className="w-4 h-4" />
            <span>Favoritos</span>
            {totalSaved > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-red-500 text-white">
                {totalSaved}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-semibold shadow-lg shadow-red-600/25 transition-all hover:scale-[1.02] active:scale-95 border border-red-400/30"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Título</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/create"
            className="p-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold shadow-md shadow-red-600/20"
            title="Añadir"
          >
            <Plus className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2 animate-slide-up">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <Film className="w-4 h-4" />
            <span>Catálogo</span>
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas & Dashboard</span>
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <Heart className="w-4 h-4" />
            <span>Favoritos y Guardados ({totalSaved})</span>
          </NavLink>
        </div>
      )}
    </header>
  );
}
