'use client'

import AuthLayout from '@/components/layout/authLayout'
import Banner from '@/components/layout/banner'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import Table from '@/components/layout/table'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import Select from '@/components/ui/select'
// import React, { useEffect } from 'react'
import { type KeyboardEvent, type MouseEvent, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Chat from '@/components/layout/Chat'
import GroupSelect from '@/components/ui/groupSelect'
import Toast from '@/components/ui/toast'
import { useAuth } from '@/hooks/auth'
import { useBooking } from '@/providers/booking'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'

const bookingSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required field',
  }),
  date: z
    .date({
      required_error: 'Date is required',
      invalid_type_error: 'Invalid date',
    })
    .refine(
      date => {
        date.setDate(date.getDate() + 1) // Adiciona um dia para comparar com a data atual

        const today = new Date()
        today.setHours(0, 0, 0, 0) // zera hora, minuto, segundo e ms
        return date >= today
      },
      {
        message: 'Date must be today or in the future',
      }
    ),

  barber: z.string().min(1, {
    message: 'Barber is required field',
  }),
  service: z.string().min(1, {
    message: 'Service is required field',
  }),
  time: z.string().min(1, {
    message: 'Time is required field',
  }),
})

type BookingSchema = z.infer<typeof bookingSchema>

export default function Booking() {
  const router = useRouter()
  const { user } = useAuth()
  const {
    professionals,
    time,
    services,
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
    handleCloseModal,
    bookingData,
    handleFetchBookingData,
    handleFetchBarbers,
    handleFetchServices,
    handleFetchAvaliableTimes,
    responseBookingData,
  } = useBooking()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.user?.name || '',
      date: selectedDate ? new Date(selectedDate) : new Date(),
      barber: selectedBarber,
      service: selectedService,
      time: selectedTime,
    },
  })

  useEffect(() => {
    setValue('name', user?.user?.name || '')
    setValue('date', selectedDate ? new Date(selectedDate) : new Date())
    setSelectedDate(
      selectedDate ? selectedDate : new Date().toISOString().split('T')[0]
    )
    setValue('barber', selectedBarber)
    setValue('service', selectedService)
    setValue('time', selectedTime)
  }, [
    user?.user?.name,
    selectedDate,
    selectedBarber,
    selectedService,
    selectedTime,
    setValue,
    setSelectedDate,
  ])

  useEffect(() => {
    handleFetchBookingData()
    handleFetchBarbers()
    handleFetchServices()
    handleFetchAvaliableTimes()
  }, [
    handleFetchBookingData,
    handleFetchBarbers,
    handleFetchServices,
    handleFetchAvaliableTimes,
  ])

  const handleBook = () => {
    handleBookAppointment()
  }

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        <Toast />
        <Chat />
        <div className="flex flex-col px-6 md:px-12 py-10 gap-10">
          <Banner showNavigation page="Booking" />

          {!user?.user?.name && (
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-bold text-danger mb-4 text-center md:text-left">
                Please complete your profile to book an appointment
              </h1>
              <p
                className="hover:underline cursor-pointer text-primary"
                onClick={() => router.push('/profile')}
                onKeyDown={() => router.push('/profile')}
              >
                Go to profile page
              </p>
            </div>
          )}

          {/* Form */}
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleBook)}
          >
            {/* Name and date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  disabled
                  value={user?.user?.name || ''}
                  {...register('name')}
                  placeholder="Enter your name"
                  data-error={!!errors?.name}
                  className="w-full rounded-lg border text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
                />

                {errors?.name && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Professional */}
              <div>
                <Select
                  description="Professional"
                  data={professionals?.map(item => ({
                    value: item?.barberId,
                    label: item?.name,
                  }))}
                  selected={selectedBarber}
                  setSelected={setSelectedBarber}
                  {...register('barber')}
                  error={!!errors.barber}
                />
                {errors?.barber && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.barber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Service, Time, Professional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date */}
              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="block text-sm font-bold text-gray-700 mb-1"
                >
                  Select a Date
                </label>
                <DatePicker
                  id="date"
                  locale="enUS"
                  minDate={new Date()}
                  // disabled={!selectedBarber}
                  // includeDates={[
                  //   new Date('2025-12-25'), // Christmas Day
                  //   new Date('2026-01-01'), // New Year's Day
                  // ]}
                  selected={new Date(selectedDate || new Date('2025-12-25'))}
                  {...register('date')}
                  onChange={date => {
                    setSelectedDate(
                      date?.toISOString().split('T')[0] ||
                        new Date().toISOString().split('T')[0]
                    )
                    setValue(
                      'date',
                      new Date(
                        date?.toISOString().split('T')[0] ||
                          new Date().toISOString().split('T')[0]
                      ),
                      {
                        shouldValidate: true,
                      }
                    )
                  }}
                  onChangeRaw={(
                    e?:
                      | MouseEvent<HTMLElement>
                      | KeyboardEvent<HTMLElement>
                      | undefined
                  ) => {
                    const target = e?.target as HTMLInputElement | undefined
                    if (!target?.value) {
                      return
                    }
                    let value = target.value.replace(/\D/g, '') // remove tudo que não é número

                    if (value.length >= 5) {
                      value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 8)}`
                    } else if (value.length >= 3) {
                      value = `${value.slice(0, 2)}-${value.slice(2, 4)}`
                    }

                    target.value = value
                  }}
                  // className="w-full rounded-lg border disabled:bg-gray-100 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-primary z-0"
                  className="w-full rounded-lg border text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 disabled:bg-gray-100 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
                  dateFormat="MM-dd-yyyy"
                  placeholderText="MM-DD-YYYY"
                />

                {errors?.date && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <GroupSelect
                  description="Service"
                  services={services}
                  selected={selectedService}
                  setSelected={setSelectedService}
                  {...register('service')}
                  error={!!errors.service}
                />
                {errors?.service && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.service.message}
                  </p>
                )}
              </div>

              {/* Time */}
              <div>
                <Select
                  description="Time"
                  data={time}
                  selected={selectedTime}
                  setSelected={setSelectedTime}
                  {...register('time')}
                  error={!!errors.time}
                />
                {errors?.time && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Book button */}
            <div className="w-full flex justify-center mt-4">
              <Button type="submit">Book Now</Button>
            </div>
          </form>

          {/* Appointments */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Appointments List
            </h2>
            <Table bookingData={bookingData} />
          </div>

          {/* Testimonials + Contact */}
          <div className="flex flex-col md:flex-row gap-6 mt-10">
            <CustomerTestimonials />
            <Contact />
          </div>
        </div>

        {/* Modal */}
        <Modal
          title="Booking Details"
          onClose={() => handleCloseModal()}
          isOpen={modalIsOpen}
        >
          <div className="space-y-2 text-sm text-gray-700">
            <hr className="border-gray-300" />
            <p>
              <span className="font-semibold">Name:</span>{' '}
              <span className="italic">{user?.user?.name}</span>
            </p>
            <p>
              <span className="font-semibold">Barber:</span>{' '}
              <span className="italic">
                {responseBookingData?.barberName || ''}
              </span>
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              <span className="italic">{responseBookingData?.date || ''}</span>
            </p>
            <p>
              <span className="font-semibold">Time:</span>{' '}
              <span className="italic">{responseBookingData?.time || ''}</span>
            </p>
            <p>
              <span className="font-semibold">Service:</span>{' '}
              <span className="italic">
                {responseBookingData?.service || ''}
              </span>
            </p>
            <hr className="border-gray-300" />
            <p className="italic text-gray-500">
              Delays of up to 15 minutes will be tolerated.
            </p>
            <p className="italic text-gray-500">
              If you are a customer of one of our plans, failure to appear will
              be considered as an exercise of your right to cut.
            </p>
          </div>
        </Modal>
      </AuthLayout>
    </div>
  )
}
