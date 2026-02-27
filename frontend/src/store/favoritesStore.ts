import { create } from 'zustand'
import { JobId } from '../types'

interface FavoritesState { 
  favorites: JobId[]
  clearFavorites: () => void
  addFavorite: (jobId: JobId) => void
  removeFavorite: (jobId: JobId) => void
  isFavorite: (jobId: JobId) => boolean
  toggleFavorite: (jobId: JobId) => void
  countFavorites: () => number
}


export const useFavoritesStore = create<FavoritesState>((set, get, store) => ({
  // Estados
  favorites: [],

  // Acciones
  clearFavorites: () => {
    set(store.getInitialState())
  },

  addFavorite: (jobId) => 
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state.favorites
        : [...state.favorites, jobId]
    })),

  removeFavorite: (jobId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId)
    })),

  isFavorite: (jobId) => {
    return get().favorites.includes(jobId)
  },

  toggleFavorite: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get()

    const isFav = isFavorite(jobId)
    isFav ? removeFavorite(jobId) : addFavorite(jobId)
  },

  countFavorites: () => get().favorites.length
})) 