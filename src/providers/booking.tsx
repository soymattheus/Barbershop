'use client'

import type { BookingData } from '@/types/booking'
import type { ServiceGroup } from '@/types/service'
import Cookies from 'js-cookie'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react'
import { toast } from 'react-toastify'

type BookingContextType = {
  professionals: { value: string; label: string }[]
  services: ServiceGroup[]
  time: { value: string; label: string }[]
  selectedDate: string | null
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>
  selectedService: string
  setSelectedService: React.Dispatch<React.SetStateAction<string>>
  selectedTime: string
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>
  selectedBarber: string
  setSelectedBarber: React.Dispatch<React.SetStateAction<string>>
  handleBookAppointment: () => Promise<void>
  modalIsOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
  bookingData: BookingData[]
  handleFetchBookingData: () => Promise<void>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [professionals, setProfessionals] = useState<
    { value: string; label: string }[]
  >([])
  const [services, setServices] = useState<ServiceGroup[]>([])
  const [time, setTime] = useState<{ value: string; label: string }[]>([])
  const [selectedDate, setSelectedDate] = React.useState<string | null>(
    new Date().toISOString().split('T')[0]
  )
  const [selectedService, setSelectedService] = React.useState<string>('')
  const [selectedTime, setSelectedTime] = React.useState<string>('')
  const [selectedBarber, setSelectedBarber] = React.useState<string>('')
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)
  const [bookingData, setBookingData] = useState<BookingData[]>([])

  useEffect(() => {
    handleFetchBarbers()
    handleFetchAvaliableTimes()
    handleFetchServices()
    handleFetchBookingData()
  }, [])

  const handleFetchBarbers = async () => {
    try {
      const data = [
        { value: 'José Hernandez', label: 'José Hernandez' },
        { value: 'Don Corte', label: 'Don Corte' },
        { value: 'El Caballero', label: 'El Caballero' },
        { value: 'El Artista', label: 'El Artista' },
      ]
      setProfessionals(data)
    } catch (error) {
      console.error('Error fetching professionals:', error)
    }
  }

  const handleFetchAvaliableTimes = async () => {
    try {
      const time = [
        { label: '9:00 AM', value: '09:00' },
        { label: '9:30 AM', value: '09:30' },
        { label: '10:00 AM', value: '10:00' },
        { label: '10:30 AM', value: '10:30' },
        { label: '11:00 AM', value: '11:00' },
        { label: '11:30 AM', value: '11:30' },
        { label: '12:00 PM', value: '12:00' },
        { label: '12:30 PM', value: '12:30' },
        { label: '1:00 PM', value: '13:00' },
        { label: '1:30 PM', value: '13:30' },
        { label: '2:00 PM', value: '14:00' },
        { label: '2:30 PM', value: '14:30' },
        { label: '3:00 PM', value: '15:00' },
        { label: '3:30 PM', value: '15:30' },
        { label: '4:00 PM', value: '16:00' },
        { label: '4:30 PM', value: '16:30' },
        { label: '5:00 PM', value: '17:00' },
        { label: '5:30 PM', value: '17:30' },
      ]
      setTime(time)
    } catch (error) {
      console.error('Error fetching time:', error)
    }
  }

  const handleFetchServices = async () => {
    try {
      const services: ServiceGroup[] = [
        {
          title: 'Haircuts',
          services: [
            {
              name: 'Classic Haircut',
              description: 'A traditional cut using clippers or scissors.',
              price: 25,
            },
            {
              name: 'Skin Fade / Bald Fade',
              description:
                'A sharp fade that goes all the way down to the skin.',
              price: 30,
            },
            {
              name: 'Taper Fade',
              description:
                'A clean and subtle fade around the neckline and sideburns.',
              price: 28,
            },
            {
              name: 'Scissor Cut',
              description:
                'A full haircut using only scissors for a more natural finish.',
              price: 32,
            },
            {
              name: 'Kids’ Haircut',
              description:
                'Fresh cuts for the little ones, styled to perfection.',
              price: 20,
            },
            {
              name: 'Hair Designs / Razor Art',
              description:
                'Custom lines and designs shaved in for a bold look.',
              price: 35,
            },
          ],
        },
        {
          title: 'Beard Services',
          services: [
            {
              name: 'Beard Trim',
              description: 'Clean up and shape your beard for a sharp finish.',
              price: 15,
            },
            {
              name: 'Hot Towel Shave',
              description:
                'Traditional straight-razor shave with a relaxing hot towel.',
              price: 22,
            },
            {
              name: 'Razor Line-Up / Shape-Up',
              description: 'Razor-sharp edges around the beard and hairline.',
              price: 18,
            },
            {
              name: 'Beard Color',
              description:
                'Cover greys or switch up your beard tone with a custom dye.',
              price: 20,
            },
          ],
        },
        {
          title: 'Premium Add-Ons',
          services: [
            {
              name: 'Eyebrow Shaping',
              description: 'Crisp, clean brows using razor or threading.',
              price: 10,
            },
            {
              name: 'Hair Styling',
              description:
                'Styled with pomade, gel, or spray—your look, your way.',
              price: 12,
            },
            {
              name: 'Shampoo & Wash',
              description:
                'Hair wash with scalp massage and professional products.',
              price: 8,
            },
            {
              name: 'Facial / Black Mask',
              description: 'Deep cleansing facial with detoxifying mask.',
              price: 15,
            },
            {
              name: 'Steam Treatment',
              description: 'Opens up pores before a shave for smoother skin.',
              price: 10,
            },
            {
              name: 'Scalp Massage',
              description:
                'Relaxing massage to boost circulation and chill you out.',
              price: 12,
            },
            {
              name: 'Nose / Ear Waxing',
              description:
                'Quick waxing for unwanted hair, clean and painless.',
              price: 10,
            },
          ],
        },
        {
          title: 'Latin-Style Services',
          services: [
            {
              name: 'Puerto Rican or Dominican Style Cuts',
              description:
                'Sharp fades, precise lines, and that clean Latino finish.',
              price: 30,
            },
            {
              name: 'Cut & Blow Dry Combo',
              description: 'Perfect cut followed by a pro blowout.',
              price: 35,
            },
            {
              name: 'The Full Service',
              description:
                'Haircut, beard, eyebrows, facial — the full experience.',
              price: 60,
            },
          ],
        },
        {
          title: 'Grooming & Self-Care',
          services: [
            {
              name: 'Facial Scrub',
              description:
                'Deep exfoliation to cleanse pores and refresh your skin.',
              price: 15,
            },
            {
              name: 'Hydrating Facial',
              description: 'Restores moisture and glow to dry or tired skin.',
              price: 20,
            },
            {
              name: 'Scalp Detox Treatment',
              description: 'Removes buildup and promotes healthy hair growth.',
              price: 18,
            },
            {
              name: 'Color Touch-Up',
              description: 'Blends in grays or refreshes faded hair color.',
              price: 25,
            },
            {
              name: 'Hair Relaxer / Texturizer',
              description: 'Chemical treatment to soften curls or waves.',
              price: 30,
            },
            {
              name: 'After-Cut Cologne Spray',
              description: 'Signature fragrance to finish your session right.',
              price: 5,
            },
          ],
        },
      ]
      setServices(services)
    } catch (error) {
      console.error('Error fetching time:', error)
    }
  }

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    handleFetchBookingData()
    setModalIsOpen(false)
    setSelectedDate(new Date().toISOString().split('T')[0])
    setSelectedService('')
    setSelectedTime('')
    setSelectedBarber('')
  }

  const handleBookAppointment = async () => {
    const user = Cookies.get('user')
    if (!user) {
      console.log('Please log in to book an appointment.')
      return
    }
    const userJson = JSON.parse(user)
    const userId = userJson?.id

    const date = selectedDate ? new Date(selectedDate) : new Date()
    date.setDate(date.getDate() + 1)

    const bookingData: BookingData = {
      id: `appt_${Date.now()}`,
      userId: userId,
      barber: selectedBarber,
      date: date.toISOString().split('T')[0],
      time: selectedTime,
      service: selectedService,
      status: 'pending',
    }

    try {
      const previousBookingData = localStorage.getItem('bookingData')
      if (previousBookingData) {
        const parsedBookingData = JSON.parse(previousBookingData)
        const updatedBookingData = [...parsedBookingData, bookingData]
        localStorage.setItem('bookingData', JSON.stringify(updatedBookingData))
      } else {
        localStorage.setItem('bookingData', JSON.stringify([bookingData]))
      }

      toast.success('Booking successful!')
    } catch (error) {
      toast.error('Error saving booking data. Please try again.')
      console.error('Error saving booking data:', error)
    }
  }

  const handleFetchBookingData = useCallback(async () => {
    const user = Cookies.get('user')
    const userJson = user ? JSON.parse(user) : null
    const userId = userJson ? userJson?.id : ''

    if (!userId) {
      console.log('No user ID found in cookies.')
      return
    }

    const bookingDataString = localStorage.getItem('bookingData')
    if (bookingDataString) {
      const parsedBookingData: BookingData[] = JSON.parse(bookingDataString)

      const userBookings = parsedBookingData.filter(
        booking => booking.userId === userId
      )
      console.log('Fetched booking data:', userBookings)
      setBookingData(userBookings)
    } else {
      setBookingData([])
      console.log('No booking data found.')
    }
  }, [])

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
        handleBookAppointment,
        modalIsOpen,
        handleOpenModal,
        handleCloseModal,
        bookingData,
        handleFetchBookingData,
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
