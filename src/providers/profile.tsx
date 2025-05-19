'use client'

import Toast from '@/components/ui/toast'
import type { BookingData } from '@/types/booking'
import type { ServiceGroup } from '@/types/service'
import type { User } from '@/types/user'
import Cookies from 'js-cookie'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth'

type ProfileContextType = {
  modalIsOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
  bookingData: BookingData[]
  handleFetchUserData: () => void
  birthDate: Date | null
  setBirthDate: React.Dispatch<React.SetStateAction<Date | null>>
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
  const [bookingData, setBookingData] = useState<BookingData[]>([])
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    console.log('ProfileProvider mounted')
    handleFetchBookingData()
    handleFetchUserData()
  }, [])

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    handleFetchBookingData()
    setModalIsOpen(false)
  }

  const handleFetchUserData = async () => {
    const userString = Cookies.get('user')
    const userData = userString ? JSON.parse(userString) : null

    if (userData) {
      setName(userData.name)
      setBirthDate(userData.birthDate)
      setPhone(userData.phone)
      setEmail(userData.email)
    } else {
      setName('')
      setBirthDate(null)
      setPhone('')
      setEmail('')
    }
  }

  const handleFetchBookingData = () => {
    const bookingDataString = localStorage.getItem('bookingData')
    if (bookingDataString) {
      const parsedBookingData: BookingData[] = JSON.parse(bookingDataString)
      setBookingData(parsedBookingData)
    } else {
      setBookingData([])
      //   toast.error('No booking data found.')
    }
  }

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
          birthDate: birthDate ? new Date(birthDate) : '',
          phone: phone,
          email: email,
          password: users[userIndex]?.user?.password || '',
          createdAt: users[userIndex]?.user?.createdAt || new Date(),
          updatedAt: new Date(),
        },
      }
      console.log('updatedUser', updatedUser)
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
        bookingData,
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
