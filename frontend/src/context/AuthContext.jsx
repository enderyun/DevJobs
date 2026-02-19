// Desde react 19 se puede utilizar "use" en lugar de "useContext" para consumir el contexto
// e importar las promesas de manera mas corta
import { createContext, useState, use } from "react"

/*
    ANOTACIONES PARA DESPUES
    - createContext: crea el contexto que va a contener el estado global
    - AuthContext: se exporta el contexto para poder consumir los componentes
    - AuthProvider: es el componente que envuelve a toda la aplicacion para proporcionar los valores
    que se desean leer (el contenido de la funcion)
*/

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  const value = {
    isLoggedIn,
    login,
    logout
  }

  return <AuthContext value={value}>
    {children}
  </AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}