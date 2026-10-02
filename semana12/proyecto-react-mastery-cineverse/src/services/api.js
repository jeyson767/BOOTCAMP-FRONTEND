import { initialMovies } from './mockData';

const STORAGE_KEY = 'cineverse_movies_db_v1';
const DELAY_MS = 350; // realistic async network delay

// Helper for simulating async API response
const wait = (ms = DELAY_MS) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Initializes localStorage with default movies if empty
 */
function getStoredMovies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMovies));
      return initialMovies;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialMovies;
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return initialMovies;
  }
}

function saveStoredMovies(movies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * CineVerse Movie API Service
 * Supports full CRUD with async Promise handling & LocalStorage fallback / APIBox compatibility
 */
export const movieApi = {
  async getAll() {
    await wait();
    return getStoredMovies();
  },

  async getById(id) {
    await wait(200);
    const movies = getStoredMovies();
    const movie = movies.find(m => String(m.id) === String(id));
    if (!movie) {
      throw new Error(`Película con ID ${id} no encontrada.`);
    }
    return movie;
  },

  async create(newMovie) {
    await wait(400);
    const movies = getStoredMovies();
    const id = Date.now().toString();
    const createdItem = {
      ...newMovie,
      id,
      voteCount: newMovie.voteCount || 1,
      rating: parseFloat(newMovie.rating) || 7.0,
      year: parseInt(newMovie.year, 10) || new Date().getFullYear(),
      duration: parseInt(newMovie.duration, 10) || 120,
      createdAt: new Date().toISOString()
    };
    const updatedList = [createdItem, ...movies];
    saveStoredMovies(updatedList);
    return createdItem;
  },

  async update(id, movieData) {
    await wait(400);
    const movies = getStoredMovies();
    const index = movies.findIndex(m => String(m.id) === String(id));
    if (index === -1) {
      throw new Error(`No se pudo encontrar la película con ID ${id} para actualizar.`);
    }

    const updatedItem = {
      ...movies[index],
      ...movieData,
      id: String(id),
      rating: parseFloat(movieData.rating) || movies[index].rating,
      year: parseInt(movieData.year, 10) || movies[index].year,
      duration: parseInt(movieData.duration, 10) || movies[index].duration,
      updatedAt: new Date().toISOString()
    };

    movies[index] = updatedItem;
    saveStoredMovies(movies);
    return updatedItem;
  },

  async delete(id) {
    await wait(300);
    const movies = getStoredMovies();
    const filtered = movies.filter(m => String(m.id) !== String(id));
    if (filtered.length === movies.length) {
      throw new Error(`La película con ID ${id} no existe o ya fue eliminada.`);
    }
    saveStoredMovies(filtered);
    return { id, success: true };
  },

  async resetDatabase() {
    await wait(300);
    saveStoredMovies(initialMovies);
    return initialMovies;
  }
};
