import Chat from '@/components/layout/Chat'
import AuthLayout from '@/components/layout/authLayout'
import Banner from '@/components/layout/banner'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import Services from '@/components/layout/services'
import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        <Chat />
        {/* Body */}
        <div className="flex flex-col px-6 gap-4 md:gap-16">
          <Banner showButton />

          {/* Services secssion */}
          <Services />

          {/* Testimonials and Contact */}
          <div className="flex flex-col md:flex-row gap-4">
            <CustomerTestimonials />
            <Contact />
          </div>
        </div>
        {/* End body */}
      </AuthLayout>
    </div>
  )
}
