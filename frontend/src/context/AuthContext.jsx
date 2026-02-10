import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { api } from '../api/client.js'
import { AuthContext } from './AuthContextValue.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const res = await api.get('/users/me')
        setUser(res.data.user)
      } catch {
        localStorage.removeItem('token')
        setToken(null)
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [token])

  const persistToken = useCallback((value) => {
    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
    }
    setToken(value)
  }, [])

  const login = useCallback(
    async (email, password) => {
      setError(null)
      const res = await api.post('/auth/login', { email, password })
      persistToken(res.data.token)
      setUser(res.data.user)

      const redirectTo =
        (location.state && location.state.from && location.state.from.pathname) || '/dashboard'
      navigate(redirectTo, { replace: true })
    },
    [location.state, navigate, persistToken],
  )

  const register = useCallback(
    async (name, email, password) => {
      setError(null)
      const res = await api.post('/auth/register', { name, email, password })
      persistToken(res.data.token)
      setUser(res.data.user)
      navigate('/dashboard', { replace: true })
    },
    [navigate, persistToken],
  )

  const logout = useCallback(() => {
    persistToken(null)
    setUser(null)
    navigate('/login', { replace: true })
  }, [navigate, persistToken])

  const value = useMemo(
    () => ({
      user,
      token,
      error,
      loading,
      isAuthenticated: Boolean(user && token),
      setError,
      login,
      register,
      logout,
    }),
    [user, token, error, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
