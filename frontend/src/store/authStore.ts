import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
  //Estados
  isLoggedIn: false,

  //Acciones
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false})
}))