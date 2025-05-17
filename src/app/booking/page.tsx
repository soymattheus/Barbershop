'use client'

import AuthLayout from '@/components/layout/authLayout'
import Banner from '@/components/layout/banner'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import Select from '@/components/ui/select'
import Table from '@/components/ui/table'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { date, z } from 'zod'

import GroupSelect from '@/components/ui/groupSelect'
import Toast from '@/components/ui/toast'
import { useAuth } from '@/hooks/auth'
import { useBooking } from '@/providers/booking'

const bookingSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required field',
  }),
  date: z.date().refine(date => date >= new Date(), {
    message: 'Date must be in the future',
  }),
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
    handleOpenModal,
    handleCloseModal,
    bookingData,
  } = useBooking()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.user?.name || '',
      date: selectedDate || new Date(),
      barber: selectedBarber,
      service: selectedService,
      time: selectedTime,
    },
    values: {
      name: user?.user?.name || '',
      date: selectedDate || new Date(),
      barber: selectedBarber,
      service: selectedService,
      time: selectedTime,
    },
  })

  const handleBook = () => {
    handleOpenModal()
    handleBookAppointment()
  }

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        <Toast />
        <div className="flex flex-col px-6 md:px-12 py-10 gap-10">
          <Banner showNavigation page="Booking" />

          {/* Form */}
          <form onSubmit={handleSubmit(handleBook)}>
            {/* Name and date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {errors?.name && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select a Date
                </label>
                <DatePicker
                  id="date"
                  selected={selectedDate}
                  {...register('date')}
                  onChange={date => {
                    setSelectedDate(date)
                  }}
                  className="w-full rounded-lg border border-gray-300 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  placeholderText="Pick a date"
                />

                {errors?.date && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>

            {/* Service, Time, Professional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <GroupSelect
                  description="Service"
                  services={services}
                  selected={selectedService}
                  setSelected={setSelectedService}
                  {...register('service')}
                />
                {errors?.service && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div>
                <Select
                  description="Time"
                  data={time}
                  selected={selectedTime}
                  setSelected={setSelectedTime}
                  {...register('time')}
                />
                {errors?.time && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.time.message}
                  </p>
                )}
              </div>
              <div>
                <Select
                  description="Professional"
                  data={professionals}
                  selected={selectedBarber}
                  setSelected={setSelectedBarber}
                  {...register('barber')}
                />
                {errors?.barber && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.barber.message}
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
              <span className="italic">{selectedBarber}</span>
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              <span className="italic">{selectedDate?.toDateString()}</span>
            </p>
            <p>
              <span className="font-semibold">Time:</span>{' '}
              <span className="italic">{selectedTime}</span>
            </p>
            <p>
              <span className="font-semibold">Service:</span>{' '}
              <span className="italic">{selectedService}</span>
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
