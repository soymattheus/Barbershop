'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

import type { User, UserData } from '@/types/user'
import { toast } from 'react-toastify'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

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
  handleSetLoyaltyPackage: (loyaltyPack: string) => Promise<void>
  isLoading: boolean
  setIsloading: (state: boolean) => void
  handlePasswordRecover: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsloading] = useState<boolean>(false)

  useEffect(() => {
    const token = Cookies.get('token')
    const userData = Cookies.get('user')

    if (token && userData) {
      handleFetchLocaleUserData()
    }
  }, [])

  const handleFetchLocaleUserData = async () => {
    const userString = Cookies.get('user')
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
          loyaltyPackage: '',
          avaliableServicesNumber: 0,
        },
      }

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.status !== 200) {
        // Handle error response
        if (response.status === 401) {
          toast.error('Incorrect password')
          return
        }
        if (response.status === 500) {
          toast.error('Server error, please try again later')
          return
        }
        if (response.status === 404) {
          toast.error('User not found')
          return
        }
      }

      if (response.status === 200) {
        const responseData = await response.json()
        data.user = responseData.user
        data.token = responseData.token
        console.log('User data:', data)

        Cookies.set('token', responseData.token || '', {
          path: '/',
          expires: 1,
        })
        Cookies.set('user', JSON.stringify(responseData.user), {
          path: '/',
          expires: 1,
        })
        setUser({ token: responseData.token, user: responseData.user })
        router.push('/portal')
      }
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
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.status !== 201) {
        // Handle error response
        if (response.status === 400) {
          const responseData = await response.json()
          if (responseData?.message) {
            toast.error(responseData.message)
          } else {
            toast.error('Bad request')
          }
          return
        }
        if (response.status === 500) {
          toast.error('Server error, please try again later')
          return
        }
        if (response.status === 409) {
          toast.error('User already exists')
          return
        }
      }
      if (response.status === 201) {
        toast.success(
          'User registered successfully. Activate your account via email'
        )
        // router.push('/login')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error('Registration failed')
    }
  }

  const handlePasswordRecover = async (email: string) => {
    try {
      setIsloading(true)
      const response = await fetch(`${apiUrl}/auth/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      if (response.status !== 201) {
        setIsloading(false)
        // Handle error response
        if (response.status === 400) {
          const responseData = await response.json()
          if (responseData?.message) {
            toast.error(responseData.message)
          } else {
            toast.error('Bad request')
          }
          return
        }
        if (response.status === 500) {
          toast.error('Server error, please try again later')
          return
        }
        if (response.status === 409) {
          toast.error('User already exists')
          return
        }
      }
      if (response.status === 200) {
        setIsloading(false)
        toast.success('A recovery email has been sent to you.')
        // router.push('/login')
      }
    } catch (error) {
      setIsloading(false)
      console.error('Registration failed:', error)
      toast.error('Registration failed')
    }
  }

  const handleSetLoyaltyPackage = async (loyaltyPack: string) => {
    try {
      const userCookies = Cookies.get('user')
      const userObject = userCookies ? JSON.parse(userCookies) : null
      const userId = userObject.id

      const response = await fetch(`${apiUrl}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          ...user?.user,
          loyaltyPackage: loyaltyPack,
          avaliableServicesNumber: 0, // Reset available services number
        }),
      })
      if (response.status !== 200) {
        // Handle error response
        if (response.status === 401) {
          toast.error('Unauthorized, please login again')
          handleLogout()
          return
        }
        if (response.status === 500) {
          toast.error('Server error, please try again later')
          return
        }
        if (response.status === 400) {
          const responseData = await response.json()
          if (responseData?.message) {
            toast.error(responseData.message)
            return
          }
        }
      }
      if (response.status === 200) {
        const responseData = await response.json()
        Cookies.set(
          'user',
          JSON.stringify({
            ...user?.user,
            loyaltyPackage: loyaltyPack,
            avaliableServicesNumber: 0,
          }),
          {
            path: '/',
            expires: 1,
          }
        )
        toast.success('Loyalty package updated successfully')
        return responseData
      }
    } catch (error) {
      console.error('Failed to set loyalty package:', error)
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
        handleSetLoyaltyPackage,
        isLoading,
        setIsloading,
        handlePasswordRecover,
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
