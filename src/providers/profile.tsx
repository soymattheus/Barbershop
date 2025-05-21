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
  const { handleFetchLocaleUserData } = useAuth()
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
    const userString = Cookies.get('user')
    const userData = userString ? await JSON.parse(userString) : null

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
  }, [])

  const handleUpdateUserData = async () => {
    const userString = Cookies.get('user')
    const user = userString ? JSON.parse(userString) : null
    if (!user) {
      toast.error('User not found.')
    }

    const id = user.id
    const users: User[] = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') || '')
      : []
    const userIndex = users.findIndex(user => user?.user?.id === id)
    if (userIndex !== -1) {
      const updatedUser = {
        ...users[userIndex],
        user: {
          id: users[userIndex]?.user?.id || '',
          name: name,
          birthDate: birthDate || '',
          phone: phone,
          email: email,
          password: users[userIndex]?.user?.password || '',
          createdAt: users[userIndex]?.user?.createdAt
            ? new Date(users[userIndex]?.user?.createdAt).toDateString()
            : '',
          updatedAt: new Date().toDateString(),
          loyaltyPackage: users[userIndex]?.user?.loyaltyPackage || '',
          avaliableServicesNumber:
            users[userIndex]?.user?.avaliableServicesNumber || 0,
        },
      }

      // Update the user data in local storage
      users[userIndex] = updatedUser
      localStorage.setItem('users', JSON.stringify(users))
      Cookies.set('user', JSON.stringify(updatedUser?.user))
      handleFetchLocaleUserData()
      toast.success('User data updated successfully.')
    } else {
      toast.error('Failed to update user data.')
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
