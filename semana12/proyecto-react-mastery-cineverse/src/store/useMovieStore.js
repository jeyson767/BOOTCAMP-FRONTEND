import { create } from 'zustand';
import { movieApi } from '../services/api';

const FAVORITES_KEY = 'cineverse_favorites_v1';
const WATCHLIST_KEY = 'cineverse_watchlist_v1';

const getLocalList = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

const saveLocalList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (err) {
    console.error(err);
  }
};

export const useMovieStore = create((set, get) => ({
  // Data state
  movies: [],
  currentMovie: null,
  isLoading: false,
  isMutating: false,
  error: null,

  // Filters & Search
  searchQuery: '',
  selectedGenre: 'Todos',
  selectedType: 'all', // 'all', 'pelicula', 'serie'
  sortBy: 'rating-desc', // 'rating-desc', 'year-desc', 'title-asc', 'duration-desc'
  viewMode: 'grid', // 'grid' | 'compact'

  // User interactions
  favorites: getLocalList(FAVORITES_KEY),
  watchlist: getLocalList(WATCHLIST_KEY),

  // Modals & Popups
  activeTrailer: {
    isOpen: false,
    title: '',
    youtubeId: ''
  },
  deleteModal: {
    isOpen: false,
    movie: null
  },

  // Notification Toast
  toast: null, // { message, type: 'success' | 'error' | 'info', id }

  // Actions
  showToast: (message, type = 'success') => {
    const id = Date.now();
    set({ toast: { message, type, id } });
    setTimeout(() => {
      if (get().toast?.id === id) {
        set({ toast: null });
      }
    }, 4000);
  },

  clearToast: () => set({ toast: null }),

  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await movieApi.getAll();
      set({ movies: data, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Error al cargar las películas', isLoading: false });
      get().showToast('Error al conectar con la base de datos', 'error');
    }
  },

  fetchMovieById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const movie = await movieApi.getById(id);
      set({ currentMovie: movie, isLoading: false });
      return movie;
    } catch (err) {
      set({ error: err.message || 'Película no encontrada', isLoading: false });
      throw err;
    }
  },

  addMovie: async (movieData) => {
    set({ isMutating: true, error: null });
    try {
      const created = await movieApi.create(movieData);
      set((state) => ({
        movies: [created, ...state.movies],
        isMutating: false
      }));
      get().showToast(`¡"${created.title}" se ha añadido con éxito!`, 'success');
      return created;
    } catch (err) {
      set({ isMutating: false, error: err.message });
      get().showToast(err.message || 'Error al crear el título', 'error');
      throw err;
    }
  },

  updateMovie: async (id, movieData) => {
    set({ isMutating: true, error: null });
    try {
      const updated = await movieApi.update(id, movieData);
      set((state) => ({
        movies: state.movies.map((m) => (String(m.id) === String(id) ? updated : m)),
        currentMovie: state.currentMovie?.id === id ? updated : state.currentMovie,
        isMutating: false
      }));
      get().showToast(`¡"${updated.title}" ha sido actualizado!`, 'success');
      return updated;
    } catch (err) {
      set({ isMutating: false, error: err.message });
      get().showToast(err.message || 'Error al actualizar', 'error');
      throw err;
    }
  },

  deleteMovie: async (id) => {
    set({ isMutating: true, error: null });
    try {
      const movieToDelete = get().movies.find(m => String(m.id) === String(id));
      await movieApi.delete(id);
      set((state) => ({
        movies: state.movies.filter((m) => String(m.id) !== String(id)),
        favorites: state.favorites.filter((favId) => String(favId) !== String(id)),
        watchlist: state.watchlist.filter((watchId) => String(watchId) !== String(id)),
        isMutating: false,
        deleteModal: { isOpen: false, movie: null }
      }));
      saveLocalList(FAVORITES_KEY, get().favorites);
      saveLocalList(WATCHLIST_KEY, get().watchlist);
      get().showToast(`"${movieToDelete?.title || 'Título'}" eliminado correctamente`, 'info');
    } catch (err) {
      set({ isMutating: false, error: err.message });
      get().showToast(err.message || 'Error al eliminar', 'error');
      throw err;
    }
  },

  resetDatabase: async () => {
    set({ isLoading: true });
    try {
      const resetList = await movieApi.resetDatabase();
      set({ movies: resetList, isLoading: false });
      get().showToast('Base de datos restaurada a valores por defecto', 'info');
    } catch (err) {
      set({ isLoading: false, error: err.message });
    }
  },

  toggleFavorite: (id) => {
    const current = get().favorites;
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    set({ favorites: updated });
    saveLocalList(FAVORITES_KEY, updated);
    get().showToast(exists ? 'Eliminado de Favoritos' : 'Añadido a Favoritos ❤️', 'info');
  },

  toggleWatchlist: (id) => {
    const current = get().watchlist;
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    set({ watchlist: updated });
    saveLocalList(WATCHLIST_KEY, updated);
    get().showToast(exists ? 'Quitado de Ver Más Tarde' : 'Guardado en Ver Más Tarde 📌', 'info');
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setViewMode: (mode) => set({ viewMode: mode }),

  openTrailer: (movie) => {
    set({
      activeTrailer: {
        isOpen: true,
        title: movie.title,
        youtubeId: movie.trailerYoutubeId || movie.trailerUrl
      }
    });
  },

  closeTrailer: () => {
    set({
      activeTrailer: {
        isOpen: false,
        title: '',
        youtubeId: ''
      }
    });
  },

  openDeleteModal: (movie) => {
    set({
      deleteModal: {
        isOpen: true,
        movie
      }
    });
  },

  closeDeleteModal: () => {
    set({
      deleteModal: {
        isOpen: false,
        movie: null
      }
    });
  }
}));
