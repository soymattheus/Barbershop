'use client'

import AuthLayout from '@/components/layout/authLayout'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import React from 'react'

export default function Galery() {
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
                <span className="italic font-bold">Galery</span>
              </p>
            </div>
          </div>

          {/* Name and date */}
          <div className="flex flex-col w-full">
            <p className="text-text font-bold text-xl">Our work</p>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4 items-stretch">
              <p className="text-text">Here comes the photos</p>
            </div>
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
