import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Film, Plus, Heart, BarChart3, Menu, X } from 'lucide-react';
import { useMovieStore } from '../../store/useMovieStore';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favorites = useMovieStore((state) => state.favorites);
  const watchlist = useMovieStore((state) => state.watchlist);

  const totalSaved = favorites.length + watchlist.length;

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 border-b border-slate-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo (No PRO badge) */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 font-['Outfit']">
              Cine<span className="text-indigo-600">Verse</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          <NavLink to="/" className={navLinkClasses}>
            <Film className="w-4 h-4" />
            <span>Catálogo</span>
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClasses}>
            <BarChart3 className="w-4 h-4" />
            <span>Métricas</span>
          </NavLink>

          <NavLink to="/favorites" className={navLinkClasses}>
            <Heart className="w-4 h-4" />
            <span>Favoritos</span>
            {totalSaved > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-indigo-600 text-white">
                {totalSaved}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/create"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Película</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/create"
            className="p-2 rounded-lg bg-indigo-600 text-white text-sm shadow-xs"
            title="Añadir"
          >
            <Plus className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 animate-slide-up">
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
            <span>Métricas</span>
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <Heart className="w-4 h-4" />
            <span>Favoritos ({totalSaved})</span>
          </NavLink>
        </div>
      )}
    </header>
  );
}
