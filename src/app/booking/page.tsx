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

export default function Booking() {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const services = [
    { value: 'classic', label: 'Classic Haircut' },
    { value: 'fade', label: 'Skin Fade' },
    { value: 'beard', label: 'Beard Trim' },
    { value: 'combo', label: 'The Full Service' },
  ]

  const professionals = [
    { value: 'thiago', label: 'Thiago Silva' },
    { value: 'cabral', label: 'Cabral Silva' },
    { value: 'jose', label: 'José Santos' },
  ]

  const time = [
    { label: '9:00 AM', value: '09:00' },
    { label: '10:00 AM', value: '10:00' },
    { label: '11:00 AM', value: '11:00' },
    { label: '12:00 PM', value: '12:00' },
    { label: '1:00 PM', value: '13:00' },
    { label: '2:00 PM', value: '14:00' },
    { label: '3:00 PM', value: '15:00' },
    { label: '4:00 PM', value: '16:00' },
  ]

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <AuthLayout>
        <div className="flex flex-col px-6 md:px-12 py-10 gap-10">
          <Banner showNavigation page="Booking" />

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
                value="Matheus Tavares"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
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
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="w-full rounded-lg border border-gray-300 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                placeholderText="Pick a date"
              />
            </div>
          </div>

          {/* Service, Time, Professional */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Select description="Service" data={services} />
            </div>
            <div>
              <Select description="Time" data={time} />
            </div>
            <div>
              <Select description="Professional" data={professionals} />
            </div>
          </div>

          {/* Book button */}
          <div className="w-full flex justify-center mt-4">
            <Button onClick={() => setIsOpen(true)}>Book Now</Button>
          </div>

          {/* Appointments */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Appointments List
            </h2>
            <Table />
          </div>

          {/* Testimonials + Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <CustomerTestimonials />
            <Contact />
          </div>
        </div>

        {/* Modal */}
        <Modal
          title="Booking Details"
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          <div className="space-y-2 text-sm text-gray-700">
            <hr className="border-gray-300" />
            <p>
              <span className="font-semibold">Name:</span>{' '}
              <span className="italic">Matheus Tavares</span>
            </p>
            <p>
              <span className="font-semibold">Barber:</span>{' '}
              <span className="italic">José Hernandez</span>
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              <span className="italic">2025-04-10</span>
            </p>
            <p>
              <span className="font-semibold">Time:</span>{' '}
              <span className="italic">11:30 AM</span>
            </p>
            <p>
              <span className="font-semibold">Service:</span>{' '}
              <span className="italic">Classic Haircut</span>
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
