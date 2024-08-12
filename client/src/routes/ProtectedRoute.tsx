import { ReactNode, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthenticationContext'
import LoadingScreen from '../pages/LoadingScreen/LoadingScreen'

interface ProtectedRouteProps {
  children?: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isStatusLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(delay)
  }, [])

  if (isStatusLoading || isLoading) {
    return <LoadingScreen isLoading={isLoading} />
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return children ? children : <Outlet />
}
