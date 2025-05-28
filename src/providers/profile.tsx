'use client'

import type { User, UserData } from '@/types/user'
import Cookies from 'js-cookie'
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth'
import formatDate from '@/utils/dateFormat'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

type ProfileContextType = {
  modalIsOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
  handleFetchUserData: () => void
  birthDate: string | null
  setBirthDate: React.Dispatch<React.SetStateAction<string | null>>
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  handleUpdateUserData: () => Promise<void>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { handleFetchLocaleUserData, setIsloading } = useAuth()
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)
  const [birthDate, setBirthDate] = useState<string | null>(null)
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  const handleFetchUserData = useCallback(async () => {
    try {
      const userCookies = Cookies.get('user')
      const userData = userCookies ? await JSON.parse(userCookies) : null

      if (userData) {
        setName(userData.name)
        setBirthDate(formatDate(userData.birthDate))
        setPhone(userData.phone)
        setEmail(userData.email)
      } else {
        setName('')
        setBirthDate(null)
        setPhone('')
        setEmail('')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Failed to fetch user data.')
    }
  }, [])

  const handleUpdateUserData = async () => {
    try {
      setIsloading(true)
      const userCookies = Cookies.get('user')
      const user = userCookies ? JSON.parse(userCookies) : null
      const userId = user.id

      const response = await fetch(`${apiUrl}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        // body: JSON.stringify({ loyaltyPackage: loyaltyPack }),
        body: JSON.stringify({
          ...user,
          name: name,
          birthDate: birthDate,
          phone: phone,
          email: email,
        }),
      })
      if (response.status !== 200) {
        setIsloading(false)
        // Handle error response
        if (response.status === 401) {
          toast.error('Unauthorized, please login again')
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
            ...user,
            name: name,
            birthDate: birthDate,
            phone: phone,
            email: email,
          }),
          {
            path: '/',
            expires: 1,
          }
        )
        handleFetchLocaleUserData()
        toast.success('Loyalty package updated successfully')
        setIsloading(false)
        return responseData
      }
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        modalIsOpen,
        handleOpenModal,
        handleCloseModal,
        handleFetchUserData,
        birthDate,
        setBirthDate,
        phone,
        setPhone,
        email,
        setEmail,
        handleUpdateUserData,
        name,
        setName,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfilemust be used within an ProfileProvider')
  }
  return context
}
