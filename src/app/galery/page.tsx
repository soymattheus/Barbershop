'use client'

import AuthLayout from '@/components/layout/authLayout'
import Banner from '@/components/layout/banner'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import React from 'react'
import PaginatedGrid from './paginatedGrid'

export default function Galery() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        {/* Body */}
        <div className="flex flex-col px-6 gap-4 md:gap-10">
          <Banner showNavigation page="Galery" />

          {/* Name and date */}
          <div className="flex flex-col w-full gap-4 md:gap-10">
            <p className="text-text font-bold text-xl">Our work</p>
            <PaginatedGrid />
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
