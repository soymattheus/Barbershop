'use client'

import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import Footer from '@/components/layout/footer'
import Services from '@/components/layout/services'
import { UserCircle } from 'lucide-react'
import React from 'react'
import {
  FaInstagram,
  FaLocationArrow,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import DrawerMenu from '../../components/layout/drawerMenu'
import HeaderBookButton from './headerBookButton'
import HeaderDrawerButton from './headerDrawerButton'

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <div className="min-h-dvh flex flex-col w-full">
      <div className="flex flex-row">
        {/* Drawer */}
        <DrawerMenu isOpen={isOpen} />

        <div
          className={`flex flex-col gap-4 md:gap-16 transition-all duration-300
          ${isOpen ? 'w-8/12 md:w-5/6' : 'w-full'}`}
        >
          {/* Header */}
          <div className="flex flex-row w-full items-center justify-between h-14 gap-8 px-6 py-2 bg-primary">
            {/* Login or prifile */}
            <HeaderDrawerButton isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Book button */}

            {!isOpen && (
              <div className="flex items-center">
                <HeaderBookButton className="flex items-center" />
              </div>
            )}
          </div>
          {/* End Header */}

          {/* Body */}
          <div className="flex flex-col px-6 gap-4 md:gap-16">
            <div className="flex flex-col w-full md:w-2/3 gap-4 items-center md:items-start">
              <h1 className="text-4xl text-primary leading-none font-heading font-medium flex flex-col md:text-6xl text-center md:text-left">
                The Barrio Barbers{' '}
                <span className="text-text text-2xl">
                  Your Latin barber shop
                </span>
              </h1>
              <p className="text-text leading-relaxed text-sm md:text-base">
                Book your appointment easily
              </p>
              <HeaderBookButton className="bg-emphasis text-text" />
            </div>

            {/* Services secssion */}
            <Services />

            {/* Testimonials and Contact */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Testimonials */}
              <CustomerTestimonials />

              {/* Contact */}
              <Contact />
            </div>
          </div>
          {/* End body */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
