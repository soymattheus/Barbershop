'use client'

import AuthLayout from '@/components/layout/authLayout'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import { Button } from '@/components/ui/button'
import Select from '@/components/ui/select'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Pricing() {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())

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
                <span className="italic font-bold">Pricing</span>
              </p>
            </div>
          </div>

          {/* Name and date */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 items-stretch">
            <div className="gap-2 flex flex-col">
              <p className="text-text font-bold text-xl">Monthly</p>
              <div className="border border-text rounded-md gap-4 p-4 flex flex-col h-full">
                <p className="text-text font-bold text-xl leading-none font-heading">
                  💈 Monthly Plan – "Classic Cut Pass"
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text font-semibold text-md leading-none font-sans">
                  $29.99/month
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text italic">Stay sharp all month long</p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text italic flex-1">
                  Enjoy up to 2 haircuts per month with priority scheduling and
                  exclusive access to monthly grooming tips. Perfect for those
                  who like to keep it clean and consistent
                </p>
                <div className="flex w-full items-center justify-center p-2">
                  <Button>Get Now</Button>
                </div>
              </div>
            </div>

            <div className="gap-2 flex flex-col">
              <p className="text-text font-bold text-xl">Semiannual</p>
              <div className="border border-text rounded-md gap-4 p-4 flex flex-col h-full">
                <p className="text-text font-bold text-xl leading-none font-heading">
                  💈 Semiannual Plan – "Gentleman's Choice"
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text font-semibold text-md leading-none font-sans">
                  $159.99/6 months
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text italic">Style meets savings</p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text italic flex-1">
                  Get up to 12 haircuts over 6 months, priority booking, and 10%
                  off beard trims and hair products. Ideal for men who value
                  routine and premium care
                </p>
                <div className="flex w-full items-center justify-center p-2">
                  <Button>Get Now</Button>
                </div>
              </div>
            </div>

            <div className="gap-2 flex flex-col">
              <p className="text-text font-bold text-xl">Annual</p>
              <div className="border border-text rounded-md gap-4 p-4 flex flex-col h-full">
                <p className="text-text font-bold text-xl leading-none font-heading">
                  💈 Annual Plan – "The Elite Groom"
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text font-semibold text-md leading-none font-sans">
                  $299.99/year
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text italic">
                  Commit to a year of looking your best.
                </p>
                <hr className="text-gray-400 p-2" />
                <p className="text-text italic flex-1">
                  Includes up to 24 haircuts annually, free beard trims, first
                  access to new services, and 15% off all products. For the true
                  modern gentleman who never settles
                </p>
                <div className="flex w-full items-center justify-center p-2">
                  <Button>Get Now</Button>
                </div>
              </div>
            </div>

            {/* Repita o mesmo padrão nos outros dois cards */}
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
      </AuthLayout>
    </div>
  )
}
