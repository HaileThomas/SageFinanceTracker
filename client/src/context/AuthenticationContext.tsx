import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { checkUserAuthentication, getUserID } from '../api/authorization'

interface AuthenticationContextProps {
  isAuthenticated: boolean
  isStatusLoading: boolean
  username: string | undefined
  userID: number | null
  refreshAuthState: () => void
}

interface AuthenticationProviderProps {
  children: ReactNode
}

const AuthenticationContext = createContext<AuthenticationContextProps>({
  isAuthenticated: false,
  isStatusLoading: false,
  username: undefined,
  userID: null,
  refreshAuthState: () => {},
})

const AuthenticationProvider = ({ children }: AuthenticationProviderProps): JSX.Element => {
  const [authState, setAuthState] = useState<Omit<AuthenticationContextProps, 'refreshAuthState'>>({
    isAuthenticated: false,
    isStatusLoading: true,
    username: undefined,
    userID: null,
  })

  useEffect(() => {
    handleAuthState.current()
  }, [])

  const handleAuthState = useRef(async () => {
    const result = await checkUserAuthentication()

    if (result.Status == 'Success') {
      const userIDResponse = await getUserID()
      const userID = userIDResponse.Status === 'Success' ? userIDResponse.UserID : null
      setAuthState({ isAuthenticated: true, isStatusLoading: false, username: result.Username, userID: userID })
    } else {
      setAuthState({ ...authState, isStatusLoading: false })
    }
  })

  return <AuthenticationContext.Provider value={{ ...authState, refreshAuthState: handleAuthState.current }}>{children}</AuthenticationContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationProvider')
  }

  return useContext(AuthenticationContext)
}

export { AuthenticationContext, AuthenticationProvider, useAuth }
