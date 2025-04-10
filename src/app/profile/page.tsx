'use client'

import AuthLayout from '@/components/layout/authLayout'
import { Button } from '@/components/ui/button'
import Table from '@/components/ui/table'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Booking() {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())

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
                <span className="italic font-bold">Profile</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <p className="text-text">
              Your current loyalty package:{' '}
              <span className="text-primary font-bold">semi-annual</span>
            </p>
            <p className="text-primary text-sm hover:underline cursor-pointer">
              Click here to see more packages
            </p>
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
                value="Matheus Tavares"
                onChange={() => {}}
                className="p-2 rounded-md border border-gray-300 text-text w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <label htmlFor="date" className="text-sm font-semibold text-text">
                Birth Date
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

          {/* Cell phone and email */}
          <div className="flex flex-wrap w-full justify-evenly md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-text"
              >
                Cell Phone:
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Type your cell phone"
                // value="+55 79 99894-2110"
                className="p-2 rounded-md border border-gray-300 text-text w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-text"
              >
                E-mail:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Type your e-mail"
                // value="+55 79 99894-2110"
                className="p-2 rounded-md border border-gray-300 text-text w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-3/7 gap-2">
              <label htmlFor="date" className="text-sm font-semibold text-text">
                Customer Since
              </label>
              <DatePicker
                name="date"
                id="date"
                disabled
                selected={startDate}
                className="p-2 rounded-md border border-gray-300 text-text w-full"
                dateFormat="MMMM d, yyyy"
                placeholderText="Pick a date"
              />
            </div>
          </div>

          <div className="flex flex-row w-full justify-center">
            <Button>Update Data</Button>
          </div>

          <div className="flex flex-col w-full justify-center gap-2">
            <p className="text-text text-2xl text-bold text-center md:text-start">
              Appointments List
            </p>
            <Table />
          </div>
        </div>
        {/* End body */}
      </AuthLayout>
    </div>
  )
}
