import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { useRouter } from "next/router"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth } from "../firebase"

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  logout: async () => { },
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        router.push('/login')
      }
      setInitialLoading(false)
    })
    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push("/")
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push("/")
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const memoUser = useMemo(() => ({
    user, loading, error, signUp, signIn, logout
  }), [user, loading, error])

  return (
    <AuthContext.Provider
      value={memoUser}
    >
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}


export default function useAuth() {
  return useContext(AuthContext)
}