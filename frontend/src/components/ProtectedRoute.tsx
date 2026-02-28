import { useAuthStore } from '../store/authStore.ts'
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace/>
  }

  return children
}