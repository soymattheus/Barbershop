'use client'

import type { Barber } from '@/types/barber'
import type { BookingData, ResponseBookingData } from '@/types/booking'
import type { ServiceGroup } from '@/types/service'
import Cookies from 'js-cookie'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  use,
} from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

type BookingContextType = {
  professionals: Barber[]
  services: ServiceGroup[]
  time: { value: string; label: string }[]
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  selectedService: string
  setSelectedService: React.Dispatch<React.SetStateAction<string>>
  selectedTime: string
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>
  selectedBarber: string
  setSelectedBarber: React.Dispatch<React.SetStateAction<string>>
  paymentType: string
  setPaymentType: React.Dispatch<React.SetStateAction<string>>
  nrPrice: number
  setNrPrice: React.Dispatch<React.SetStateAction<number>>
  handleBookAppointment: () => Promise<void>
  modalIsOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
  bookingData: BookingData[]
  handleFetchBookingData: () => Promise<void>
  responseBookingData: ResponseBookingData | undefined
  handleFetchBarbers: () => Promise<void>
  handleFetchServices: () => Promise<void>
  handleFetchAvaliableTimes: (idBarber: string, date: Date) => Promise<void>
  handleUpdateBoogkindStatus: (
    bookingId: string,
    status: string
  ) => Promise<void>
  availableDates: Date[]
  handleFetchAvailableDates: (idBarber: string) => Promise<void>
  setTime: React.Dispatch<
    React.SetStateAction<{ value: string; label: string }[]>
  >
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { setIsloading } = useAuth()
  const [professionals, setProfessionals] = useState<Barber[]>([])
  const [services, setServices] = useState<ServiceGroup[]>([])
  const [time, setTime] = useState<{ value: string; label: string }[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [selectedService, setSelectedService] = React.useState<string>('')
  const [selectedTime, setSelectedTime] = React.useState<string>('')
  const [selectedBarber, setSelectedBarber] = React.useState<string>('')
  const [paymentType, setPaymentType] = useState<string>('pix')
  const [nrPrice, setNrPrice] = useState<number>(10)
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)
  const [bookingData, setBookingData] = useState<BookingData[]>([])
  const [responseBookingData, setResponseBookingData] = useState<
    ResponseBookingData | undefined
  >()
  const [availableDates, setAvailableDates] = useState<Date[]>([])

  const handleFetchBarbers = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/barber/query`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      if (response.status !== 200) {
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
        const barbers = await response.json()
        setProfessionals(barbers.barbers)
      }
    } catch (error) {
      console.error('Error fetching professionals:', error)
    }
  }, [])

  const handleFetchAvailableDates = useCallback(
    async (idBarber: string) => {
      try {
        setIsloading(true)
        const response = await fetch(
          `${apiUrl}/booking/query-dates/${idBarber}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        )
        setIsloading(false)

        if (response.status !== 200) {
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
          const dates = await response.json()
          if (dates?.dates?.length > 0) {
            setSelectedDate(dates?.dates[0]?.date)
            handleFetchAvaliableTimes(idBarber, dates?.dates[0]?.date)
          }
          setAvailableDates(
            dates.dates.map((date: { date: Date }) => date?.date)
          )
        }
      } catch (error) {
        console.error('Error fetching professionals:', error)
      }
    },
    [setIsloading]
  )

  const handleFetchAvaliableTimes = useCallback(
    async (idBarber: string, date: Date) => {
      console.log(new Date(date).toISOString().split('T')[0])
      const _date = new Date(date).toISOString().split('T')[0]
      try {
        // const date = selectedDate.toISOString().split('T')[0]
        const response = await fetch(
          `${apiUrl}/booking/query-times/${_date}/${idBarber}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        )

        if (response.status !== 200) {
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
          const times = await response.json()
          setTime(
            times.times?.map((time: { id_booking: string; time: string }) => {
              return { label: time.time, value: time.id_booking }
            })
          )
        }
      } catch (error) {
        console.error('Error fetching time:', error)
      }
    },
    []
  )

  const handleFetchServices = useCallback(async () => {
    try {
      const services: { services: ServiceGroup[] } = await fetch(
        `${apiUrl}/service/query`
      ).then(response => response.json())

      setServices(services.services)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }, [])

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    handleFetchBookingData()
    setModalIsOpen(false)
    setSelectedDate(new Date())
    setSelectedService('')
    setSelectedTime('')
    setSelectedBarber('')
    setResponseBookingData(undefined)
  }

  const handleBookAppointment = async () => {
    setIsloading(true)
    const userCookies = Cookies.get('user')
    if (!userCookies) {
      toast.error('Please log in to book an appointment.')
      return
    }

    const userLoggedJson = JSON.parse(userCookies)
    const userId = userLoggedJson?.id

    const date = selectedDate ? new Date(selectedDate) : new Date()

    const bookingData = {
      bookingId: selectedTime,
      serviceId: selectedService,
      nrPrice: nrPrice,
    }

    try {
      const response = await fetch(`${apiUrl}/booking/insert/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(bookingData),
      })
      if (response.status !== 201) {
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
        setResponseBookingData(await response.json())
        handleOpenModal()
        toast.success('Booking successful!')
        setIsloading(false)
      }
    } catch (error) {
      setIsloading(false)
      toast.error('Error saving booking data. Please try again.')
    }
  }

  const handleFetchBookingData = useCallback(async () => {
    const user = Cookies.get('user')
    const userJson = user ? JSON.parse(user) : null
    const userId = userJson ? userJson?.id : ''

    if (!userId) {
      toast.error('No user ID found in cookies.')
      return
    }

    const response = await fetch(`${apiUrl}/booking/query/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    if (response.status !== 200) {
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
      const bookings = await response.json()
      setBookingData(bookings?.bookings)
      return
    }

    setBookingData([])
  }, [])

  const handleUpdateBoogkindStatus = async (
    bookingId: string,
    status: string
  ) => {
    try {
      const user = Cookies.get('user')
      const userJson = user ? JSON.parse(user) : null
      const userId = userJson ? userJson?.id : ''

      if (!userId) {
        toast.error('No user ID found in cookies.')
        return
      }

      setIsloading(true)
      const response = await fetch(`${apiUrl}/booking/cancel/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ bookingId }),
      })

      if (response.status !== 200) {
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
        toast.success('Booking status updated successfully!')
        await handleFetchBookingData()
      }

      setIsloading(false)
    } catch (error) {
      console.error('Error updating booking status:', error)
      toast.error('Error updating booking status. Please try again.')
    }
  }

  return (
    <BookingContext.Provider
      value={{
        professionals,
        services,
        time,
        selectedDate,
        setSelectedDate,
        selectedService,
        setSelectedService,
        selectedTime,
        setSelectedTime,
        selectedBarber,
        setSelectedBarber,
        paymentType,
        setPaymentType,
        nrPrice,
        setNrPrice,
        handleBookAppointment,
        modalIsOpen,
        handleOpenModal,
        handleCloseModal,
        bookingData,
        handleFetchBookingData,
        handleFetchBarbers,
        handleFetchServices,
        handleFetchAvaliableTimes,
        responseBookingData,
        handleUpdateBoogkindStatus,
        availableDates,
        handleFetchAvailableDates,
        setTime,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within an BookingProvider')
  }
  return context
}
