import { ReactNode, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthenticationContext'
import { LoadingScreen } from '../pages'

interface UnauthenticatedRouteProps {
  children?: ReactNode
}

export const UnauthenticatedRoute = ({ children }: UnauthenticatedRouteProps) => {
  const { isAuthenticated, isStatusLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(delay)
  }, [])

  if (isStatusLoading || isLoading) {
    return <LoadingScreen isLoading={isLoading} />
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return children ? children : <Outlet />
}
