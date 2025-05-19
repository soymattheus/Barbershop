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
import { v4 as uuidv4 } from 'uuid'

import type { User } from '@/types/user'
import { toast } from 'react-toastify'

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  handleLogout: () => void
  handleLogin: (email: string, password: string) => Promise<void>
  handleRegister: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>
  handleFetchLocaleUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')
    const userData = Cookies.get('user')

    if (token && userData) {
      handleFetchLocaleUserData()
    }
  }, [])

  const handleFetchLocaleUserData = async () => {
    const userString = Cookies.get('user')
    console.log('userString', userString)
    const userData = userString ? JSON.parse(userString) : null
    if (userData) {
      setUser({
        token: Cookies.get('token') || '',
        user: userData,
      })
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const data: User = {
        token: '',
        user: {
          id: '',
          name: '',
          email: '',
          password: '',
          birthDate: '',
          phone: '',
          createdAt: '',
          updatedAt: '',
        },
      }

      const users: User[] = localStorage.getItem('users')
        ? JSON.parse(localStorage.getItem('users') || '')
        : []

      const userExists = users.find((user: User) => user?.user?.email === email)
      if (userExists) {
        if (password === userExists?.user?.password) {
          data.user = userExists.user
          data.token = userExists.token
          Cookies.set('token', userExists.token, { path: '/', expires: 1 })
          Cookies.set('user', JSON.stringify(userExists.user), {
            path: '/',
            expires: 1,
          })
          setUser({ token: userExists.token, user: userExists.user })
          router.push('/portal')
        } else {
          toast.error('Invalid password')
        }
      } else {
        toast.error('User not found')
      }

      // const userData = data.user
      // const token = data.token

      // if (userData && token) {
      //   Cookies.set('token', token, { path: '/', expires: 1 })
      //   Cookies.set('user', JSON.stringify(userData), { path: '/', expires: 1 })

      //   setUser({ token, user: userData })

      //   router.push('/portal')
      // }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = (): void => {
    Cookies.remove('token')
    Cookies.remove('user')
    setUser(null)
    router.push('/')
  }

  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const users: User[] = localStorage.getItem('users')
        ? JSON.parse(localStorage.getItem('users') || '')
        : []
      const userExists = users.find((user: User) => user?.user?.email === email)
      if (userExists) {
        toast.error('User already exists')
        return
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      const newUser: User = {
        token: `Token-${Math.random().toString(36).substring(2, 15)}`,
        user: {
          id: uuidv4(),
          name: '',
          email: email,
          password: password,
          birthDate: '',
          phone: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      toast.success('User registered successfully')
      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error('Registration failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        handleRegister,
        handleFetchLocaleUserData,
      }}
    >
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
