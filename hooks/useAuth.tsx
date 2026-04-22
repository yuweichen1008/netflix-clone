import { useRouter } from "next/router"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

interface AuthUser {
  email: string
}

interface IAuth {
  user: AuthUser | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

const STORAGE_KEY = 'netflix-user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      } else {
        router.push('/login')
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      router.push('/login')
    } finally {
      setInitialLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      const newUser = { email }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
      setUser(newUser)
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      const loggedUser = { email }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
      setUser(loggedUser)
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    router.push('/login')
  }

  const memoUser = useMemo(
    () => ({ user, loading, error, signUp, signIn, logout }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoUser}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
