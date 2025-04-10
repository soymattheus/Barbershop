'use client'

import AuthLayout from '@/components/layout/authLayout'
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
    {
      value: 'classic',
      label: 'Classic Haircut',
    },
    {
      value: 'fade',
      label: 'Skin Fade',
    },
    {
      value: 'beard',
      label: 'Beard Trim',
    },
    {
      value: 'combo',
      label: 'The Full Service',
    },
  ]

  const professionals = [
    {
      value: 'thiago',
      label: 'Thiago Silva',
    },
    {
      value: 'cabral',
      label: 'Cabral Silva',
    },
    {
      value: 'jose',
      label: 'José Santos',
    },
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
    <div className="flex flex-col w-full">
      <AuthLayout>
        {/* Body */}
        <div className="flex flex-col px-6 gap-4 md:gap-10">
          <div className="flex flex-col w-full md:w-2/3 gap-4 items-center md:items-start">
            <h1 className="text-4xl text-primary leading-none font-heading font-medium flex flex-col md:text-6xl text-center md:text-left">
              The Barrio Barbers{' '}
              <span className="text-text text-2xl">Your Latin barber shop</span>
            </h1>
            <div className="flex flex-row w-full">
              <p className="text-text leading-relaxed text-sm md:text-base">
                <span className="italic hover:underline cursor-pointer">
                  Home
                </span>
                <span className="italic">{' > '}</span>
                <span className="italic font-bold">Booking</span>
              </p>
            </div>
          </div>

          {/* Name and date */}
          <div className="flex flex-wrap w-full justify-evenly md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-text">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                disabled
                value="Matheus Tavares"
                className="p-2 rounded-md border border-gray-300 text-text w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <label htmlFor="date" className="text-sm font-semibold text-text">
                Select a Date
              </label>
              <DatePicker
                name="date"
                id="date"
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="p-2 rounded-md border border-gray-300 text-text w-full"
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                placeholderText="Pick a date"
              />
            </div>
          </div>

          {/* Service, time and profissional */}
          <div className="flex flex-wrap w-full justify-evenly md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <Select description="Service" data={services} />
            </div>

            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <Select description="Time" data={time} />
            </div>

            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <Select description="Profissional" data={professionals} />
            </div>
          </div>

          <div className="flex flex-row w-full justify-center">
            <Button onClick={() => setIsOpen(true)}>Book Now</Button>
          </div>

          <div className="flex flex-col w-full justify-center gap-2">
            <p className="text-text text-2xl text-bold text-center md:text-start">
              Appointments List
            </p>
            <Table />
          </div>

          {/* Testimonials and Contact */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Testimonials */}
            <CustomerTestimonials />

            {/* Contact */}
            <Contact />
          </div>
        </div>
        {/* End body */}

        <Modal
          title="Booking Details"
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          <div className="flex flex-col w-full gap-2">
            <hr className="text-gray-400 px-2" />
            <p className="text-text font-bold">
              Name:{' '}
              <span className="text-text font-medium italic">
                Matheus Tavares
              </span>
            </p>
            <p className="text-text font-bold">
              Barber:{' '}
              <span className="text-text font-medium italic">
                José Hernandez
              </span>
            </p>
            <p className="text-text font-bold">
              Date:{' '}
              <span className="text-text font-medium italic">2025-04-10</span>
            </p>
            <p className="text-text font-bold">
              Time:{' '}
              <span className="text-text font-medium italic">11:30 am</span>
            </p>
            <p className="text-text font-bold">
              Service:{' '}
              <span className="text-text font-medium italic">
                Classic Haircut
              </span>
            </p>
            <hr className="text-text px-2" />
            <p className="text-text italic text-sm">
              Delays of up to 15 minutes will be tolerated
            </p>
            <p className="text-text italic text-sm">
              If you are a customer of one of our plans, failure to appear will
              be considered as an exercise of your right to cut.
            </p>
          </div>
        </Modal>
      </AuthLayout>
    </div>
  )
}
