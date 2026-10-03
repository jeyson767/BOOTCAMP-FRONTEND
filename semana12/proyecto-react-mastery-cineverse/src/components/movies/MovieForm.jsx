import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Image, Video, Star, Calendar, Clock, 
  User, Users, AlignLeft, Check, ArrowLeft, Loader2, Eye, Edit3 
} from 'lucide-react';
import { ALL_GENRES, SAMPLE_PRESETS } from '../../services/mockData';
import { extractYoutubeId, formatDuration, getRatingBadgeClass } from '../../utils/formatters';

export default function MovieForm({ initialData = null, onSubmit, isEditing = false, isLoading = false }) {
  const navigate = useNavigate();
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'

  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    type: 'pelicula',
    year: new Date().getFullYear(),
    duration: 120,
    rating: 8.0,
    genres: ['Acción', 'Ciencia Ficción'],
    director: '',
    cast: '',
    status: 'Disponible',
    poster: '',
    backdrop: '',
    trailerUrl: '',
    synopsis: '',
    language: 'Español Latino'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        originalTitle: initialData.originalTitle || '',
        type: initialData.type || 'pelicula',
        year: initialData.year || new Date().getFullYear(),
        duration: initialData.duration || 120,
        rating: initialData.rating || 7.5,
        genres: Array.isArray(initialData.genres) ? initialData.genres : ['Acción'],
        director: initialData.director || '',
        cast: Array.isArray(initialData.cast) ? initialData.cast.join(', ') : (initialData.cast || ''),
        status: initialData.status || 'Disponible',
        poster: initialData.poster || '',
        backdrop: initialData.backdrop || '',
        trailerUrl: initialData.trailerUrl || (initialData.trailerYoutubeId ? `https://youtube.com/watch?v=${initialData.trailerYoutubeId}` : ''),
        synopsis: initialData.synopsis || '',
        language: initialData.language || 'Español Latino'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => {
      const exists = prev.genres.includes(genre);
      const newGenres = exists
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: newGenres.length > 0 ? newGenres : ['Acción'] };
    });
  };

  const handleFillSample = (preset) => {
    setFormData({
      title: preset.title,
      originalTitle: preset.title,
      type: preset.type,
      year: preset.year,
      duration: preset.duration,
      rating: preset.rating,
      genres: preset.genres,
      director: preset.director,
      cast: preset.cast.join(', '),
      status: preset.status,
      poster: preset.poster,
      backdrop: preset.backdrop,
      trailerUrl: preset.trailerUrl,
      synopsis: preset.synopsis,
      language: preset.language
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.poster.trim()) newErrors.poster = 'El póster es obligatorio';
    if (!formData.synopsis.trim()) newErrors.synopsis = 'La sinopsis es obligatoria';
    if (formData.genres.length === 0) newErrors.genres = 'Selecciona al menos 1 género';
    if (!formData.year || formData.year < 1900 || formData.year > 2099) {
      newErrors.year = 'Año inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMobileTab('form');
      return;
    }

    const payload = {
      ...formData,
      trailerYoutubeId: extractYoutubeId(formData.trailerUrl),
      cast: typeof formData.cast === 'string'
        ? formData.cast.split(',').map((c) => c.trim()).filter(Boolean)
        : formData.cast,
      year: parseInt(formData.year, 10),
      duration: parseInt(formData.duration, 10),
      rating: parseFloat(formData.rating)
    };

    await onSubmit(payload);
  };

  const defaultPoster = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="space-y-5">
      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'form'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Formulario</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'preview'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Previa</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Container (7 cols) */}
        <div className={`lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs ${
          mobileTab === 'preview' ? 'hidden lg:block' : 'block'
        }`}>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                {isEditing ? 'Editar Película' : 'Nueva Película'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing ? 'Actualiza los datos del título' : 'Agrega un título a tu catálogo'}
              </p>
            </div>

            {!isEditing && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Ejemplos:</span>
                <button
                  type="button"
                  onClick={() => handleFillSample(SAMPLE_PRESETS[0])}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  Cyberpunk
                </button>
                <button
                  type="button"
                  onClick={() => handleFillSample(SAMPLE_PRESETS[1])}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Gladiador II
                </button>
              </div>
            )}
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            
            {/* Title & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej. Interstellar"
                  className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border ${
                    errors.title ? 'border-rose-400' : 'border-slate-200'
                  } text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white`}
                />
                {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                >
                  <option value="pelicula">Película</option>
                  <option value="serie">Serie</option>
                </select>
              </div>
            </div>

            {/* Year, Duration, Rating, Status */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Año *
                </label>
                <input
                  type="number"
                  name="year"
                  min="1900"
                  max="2099"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duración (min)
                </label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  max="600"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nota (1-10)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Estreno">Estreno</option>
                  <option value="Próximamente">Próximamente</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
            </div>

            {/* Media Links */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL del Póster *
                </label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border ${
                    errors.poster ? 'border-rose-400' : 'border-slate-200'
                  } text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white`}
                />
                {errors.poster && <p className="text-[11px] text-rose-500 mt-1">{errors.poster}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Banner Horizontal (Opcional)
                  </label>
                  <input
                    type="url"
                    name="backdrop"
                    value={formData.backdrop}
                    onChange={handleChange}
                    placeholder="URL de fondo"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trailer de YouTube
                  </label>
                  <input
                    type="url"
                    name="trailerUrl"
                    value={formData.trailerUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Genres */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Géneros *
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GENRES.map((genre) => {
                  const isSelected = formData.genres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {genre}
                    </button>
                  );
                })}
              </div>
              {errors.genres && <p className="text-[11px] text-rose-500 mt-1">{errors.genres}</p>}
            </div>

            {/* Director & Cast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  placeholder="Nombre del director"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reparto Principal
                </label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  placeholder="Actor 1, Actor 2"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sinopsis *
              </label>
              <textarea
                name="synopsis"
                rows="3"
                value={formData.synopsis}
                onChange={handleChange}
                placeholder="Breve resumen de la historia..."
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border ${
                  errors.synopsis ? 'border-rose-400' : 'border-slate-200'
                } text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white leading-relaxed`}
              />
              {errors.synopsis && <p className="text-[11px] text-rose-500 mt-1">{errors.synopsis}</p>}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Guardar Cambios' : 'Guardar Película'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Card (5 cols) */}
        <div className={`lg:col-span-5 sticky top-24 space-y-3 ${
          mobileTab === 'form' ? 'hidden lg:block' : 'block'
        }`}>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-500">
              Vista previa
            </span>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            {/* Poster image preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <img
                src={formData.backdrop || formData.poster || defaultPoster}
                alt="Vista previa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultPoster;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/90 text-slate-800 shadow-xs">
                  {formData.type === 'serie' ? 'Serie' : 'Película'}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-600 text-white shadow-xs">
                  {formData.status}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 ${getRatingBadgeClass(formData.rating)}`}>
                  <Star className="w-3 h-3 fill-current" />
                  {formData.rating || '0.0'}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>{formData.year || '2026'}</span>
                <span>•</span>
                <span>{formatDuration(formData.duration)}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-['Outfit'] line-clamp-1">
                {formData.title || 'Título de la película'}
              </h3>

              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {formData.synopsis || 'La descripción se actualizará conforme escribas.'}
              </p>

              <div className="flex flex-wrap gap-1 mt-2.5">
                {formData.genres.map((g) => (
                  <span key={g} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {g}
                  </span>
                ))}
              </div>

              {formData.director && (
                <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Director:</span>
                  <span className="font-medium text-slate-800">{formData.director}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
