import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Film, Sparkles, Image, Video, Star, Calendar, Clock, 
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
    <div className="space-y-6">
      {/* Mobile Tab Switcher (Visible only on < lg) */}
      <div className="flex lg:hidden items-center p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'form'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Formulario</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'preview'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Previa</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container (7 cols) */}
        <div className={`lg:col-span-7 glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-800 ${
          mobileTab === 'preview' ? 'hidden lg:block' : 'block'
        }`}>
          
          {/* Header with presets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                {isEditing ? '✏️ Editar Título' : '✨ Crear Nuevo Título'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Completa la ficha técnica para {isEditing ? 'actualizar' : 'publicar en'} CineVerse
              </p>
            </div>

            {!isEditing && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Plantillas:</span>
                <button
                  type="button"
                  onClick={() => handleFillSample(SAMPLE_PRESETS[0])}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1"
                  title="Llenar con Cyberpunk"
                >
                  <Sparkles className="w-3 h-3 text-red-400" />
                  Cyberpunk
                </button>
                <button
                  type="button"
                  onClick={() => handleFillSample(SAMPLE_PRESETS[1])}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1"
                  title="Llenar con Gladiador II"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Gladiador II
                </button>
              </div>
            )}
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 mt-5 sm:mt-6">
            
            {/* Title & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 sm:mb-2">
                  Título de la Producción *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej. Spider-Man: Beyond the Spider-Verse"
                  className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 border ${
                    errors.title ? 'border-rose-500' : 'border-slate-700'
                  } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500`}
                />
                {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 sm:mb-2">
                  Tipo *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                >
                  <option value="pelicula">Película</option>
                  <option value="serie">Serie de TV</option>
                </select>
              </div>
            </div>

            {/* Year, Duration, Rating, Status */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Año *
                </label>
                <input
                  type="number"
                  name="year"
                  min="1900"
                  max="2099"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Duración (min)
                </label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  max="600"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" /> Nota (1-10)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-2 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Estreno">Estreno</option>
                  <option value="Próximamente">Próximamente</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
            </div>

            {/* Media Links: Poster, Backdrop, Trailer */}
            <div className="space-y-3 sm:space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-red-400" /> URL del Póster Vertical *
                </label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 border ${
                    errors.poster ? 'border-rose-500' : 'border-slate-700'
                  } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500`}
                />
                {errors.poster && <p className="text-xs text-rose-400 mt-1">{errors.poster}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-purple-400" /> Backdrop / Banner Horizontal
                  </label>
                  <input
                    type="url"
                    name="backdrop"
                    value={formData.backdrop}
                    onChange={handleChange}
                    placeholder="URL opcional de banner"
                    className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-red-500" /> URL Trailer de YouTube
                  </label>
                  <input
                    type="url"
                    name="trailerUrl"
                    value={formData.trailerUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Genres Selection Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Géneros ({formData.genres.length} seleccionados) *
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {ALL_GENRES.map((genre) => {
                  const isSelected = formData.genres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30 border border-red-500'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {genre}
                    </button>
                  );
                })}
              </div>
              {errors.genres && <p className="text-xs text-rose-400 mt-1">{errors.genres}</p>}
            </div>

            {/* Director & Cast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Director(es)
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  placeholder="Ej. Christopher Nolan"
                  className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> Reparto Principal
                </label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  placeholder="Actor 1, Actor 2"
                  className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-slate-400" /> Sinopsis / Descripción *
              </label>
              <textarea
                name="synopsis"
                rows="4"
                value={formData.synopsis}
                onChange={handleChange}
                placeholder="Describe de qué trata la película o serie..."
                className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-900 border ${
                  errors.synopsis ? 'border-rose-500' : 'border-slate-700'
                } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 leading-relaxed`}
              />
              {errors.synopsis && <p className="text-xs text-rose-400 mt-1">{errors.synopsis}</p>}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isEditing ? 'Guardar Cambios' : 'Publicar Título'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Card (5 cols) */}
        <div className={`lg:col-span-5 sticky top-28 space-y-4 ${
          mobileTab === 'form' ? 'hidden lg:block' : 'block'
        }`}>
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              👁️ Vista Previa en Vivo
            </span>
            <span className="text-xs text-red-400 font-medium">Actualización en tiempo real</span>
          </div>

          <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Poster image preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                src={formData.backdrop || formData.poster || defaultPoster}
                alt="Vista previa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultPoster;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900/90 text-white border border-slate-700/60 backdrop-blur-md">
                  {formData.type === 'serie' ? 'Serie' : 'Película'}
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 backdrop-blur-md">
                  {formData.status}
                </span>
              </div>

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border backdrop-blur-md flex items-center gap-1 ${getRatingBadgeClass(formData.rating)}`}>
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  {formData.rating || '0.0'}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                <span>{formData.year || '2026'}</span>
                <span>•</span>
                <span>{formatDuration(formData.duration)}</span>
                <span>•</span>
                <span>{formData.language}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white font-['Outfit'] line-clamp-1">
                {formData.title || 'Título de la Película'}
              </h3>

              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                {formData.synopsis || 'Ingresa la sinopsis en el formulario para ver cómo se verá tu ficha en el catálogo de CineVerse.'}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
                {formData.genres.map((g) => (
                  <span key={g} className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                    {g}
                  </span>
                ))}
              </div>

              {formData.director && (
                <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                  <span>Director:</span>
                  <span className="font-medium text-white">{formData.director}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
