import { createContext, useState } from "react"

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