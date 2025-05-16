'use client'

import { Login } from '@/http/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

type User = {
  token: string
  user: {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
  } | null
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  handleLogout: () => void
  handleLogin: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')
    const userData = Cookies.get('user')

    if (token && userData) {
      setUser({
        token,
        user: JSON.parse(userData),
      })
    }
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await Login({ email, password })

      const userData = data.user
      const token = data.token

      if (userData && token) {
        Cookies.set('token', token, { path: '/', expires: 1 })
        Cookies.set('user', JSON.stringify(userData), { path: '/', expires: 1 })

        setUser({ token, user: userData })

        router.push('/portal')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
