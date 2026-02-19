// TODO: estudiar lo que hace ese FavContext.jsx
import { createContext, use, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (jobId) => {
    setFavorites((prevFavorites) => [...prevFavorites, jobId])
  }

  const removeFavorite = (jobId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== jobId))
  }

  const isFavorite = (jobId) => {
    return favorites.includes(jobId)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return (
    <FavoritesContext value={value}>
      {children}
    </FavoritesContext>
  )
}

export function useFav() {
  const context = use(FavoritesContext)

  if (!context) {
    throw new Error('useFav must be used within a FavoritesProvider')
  }

  return context
}