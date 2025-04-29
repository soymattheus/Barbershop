'use client'

import AuthLayout from '@/components/layout/authLayout'
import Banner from '@/components/layout/banner'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'
import { Button } from '@/components/ui/button'
import type React from 'react'
import 'react-datepicker/dist/react-datepicker.css'

export default function Pricing() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        {/* Body */}
        <div className="flex flex-col px-6 gap-8 md:gap-12 py-10">
          <Banner showNavigation page="Pricing" />

          {/* Name and date */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 items-stretch">
            {/** Monthly Plan */}
            <div className="gap-4 flex flex-col">
              <p className="text-text font-extrabold text-2xl text-center">
                Monthly
              </p>
              <div className="bg-white shadow-xl border border-gray-200 rounded-xl gap-4 p-6 flex flex-col h-full">
                <p className="text-primary font-bold text-2xl leading-none font-heading text-center">
                  💈 Classic Cut Pass
                </p>
                <p className="text-gray-500 text-center">$29.99/month</p>
                <p className="text-text italic text-center">
                  Stay sharp all month long
                </p>
                <p className="text-text italic flex-1 text-sm text-center">
                  Enjoy up to 2 haircuts/month with priority scheduling &
                  exclusive grooming tips.
                </p>

                <PlanDetails plan="monthly" />

                <div className="flex w-full items-center justify-center pt-4">
                  <Button className="w-full">Get Now</Button>
                </div>
              </div>
            </div>

            {/** Semiannual Plan */}
            <div className="gap-4 flex flex-col">
              <p className="text-text font-extrabold text-2xl text-center">
                Semiannual
              </p>
              <div className="bg-white shadow-xl border border-gray-200 rounded-xl gap-4 p-6 flex flex-col h-full">
                <p className="text-primary font-bold text-2xl leading-none font-heading text-center">
                  💈 Gentleman's Choice
                </p>
                <p className="text-gray-500 text-center">$159.99/6 months</p>
                <p className="text-text italic text-center">
                  Style meets savings
                </p>
                <p className="text-text italic flex-1 text-sm text-center">
                  Up to 12 haircuts/6 months, priority booking & 10% off beard
                  trims/products.
                </p>

                <PlanDetails plan="semiannual" />

                <div className="flex w-full items-center justify-center pt-4">
                  <Button className="w-full">Get Now</Button>
                </div>
              </div>
            </div>

            {/** Annual Plan */}
            <div className="gap-4 flex flex-col">
              <p className="text-text font-extrabold text-2xl text-center">
                Annual
              </p>
              <div className="bg-white shadow-xl border border-yellow-400 rounded-xl gap-4 p-6 flex flex-col h-full">
                <p className="text-primary font-bold text-2xl leading-none font-heading text-center">
                  💈 The Elite Groom
                </p>
                <p className="text-gray-500 text-center">$299.99/year</p>
                <p className="text-text italic text-center">
                  Commit to a year of looking your best
                </p>
                <p className="text-text italic flex-1 text-sm text-center">
                  24 haircuts/year, free beard trims, access to new services &
                  15% off all products.
                </p>

                <PlanDetails plan="annual" />

                <div className="flex w-full items-center justify-center pt-4">
                  <Button className="w-full">Get Now</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials and Contact */}
          <div className="flex flex-col md:flex-row gap-6 pt-10">
            <CustomerTestimonials />
            <Contact />
          </div>
        </div>
        {/* End body */}
      </AuthLayout>
    </div>
  )
}

type PlanType = 'monthly' | 'semiannual' | 'annual'

interface PlanDetailsProps {
  plan: PlanType
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ plan }) => {
  const sharedServices: string[] = [
    'Skin Fade / Bald Fade',
    'Taper Fade',
    'Scissor Cut',
    'Kids’ Haircut',
    'Hair Designs / Razor Art',
  ]

  const services: Record<
    PlanType,
    {
      beard: boolean
      premium: boolean
      latin: boolean
      grooming: boolean
    }
  > = {
    monthly: {
      beard: false,
      premium: false,
      latin: false,
      grooming: false,
    },
    semiannual: {
      beard: true,
      premium: true,
      latin: false,
      grooming: false,
    },
    annual: {
      beard: true,
      premium: true,
      latin: true,
      grooming: true,
    },
  }

  const show = services[plan]

  return (
    <div className="text-sm text-text flex flex-col gap-2">
      <div>
        <p className="font-bold text-primary">Haircuts</p>
        {sharedServices.map(service => (
          <p className="italic" key={service}>
            {service}
          </p>
        ))}
      </div>

      <div>
        <p className="font-bold text-primary">Beard Services</p>
        {[
          'Beard Trim',
          'Hot Towel Shave',
          'Razor Line-Up / Shape-Up',
          'Beard Color',
        ].map(service => (
          <p
            className={`italic ${!show.beard ? 'line-through text-gray-400' : ''}`}
            key={service}
          >
            {service}
          </p>
        ))}
      </div>

      <div>
        <p className="font-bold text-primary">Premium Add-Ons</p>
        {[
          'Eyebrow Shaping',
          'Hair Styling',
          'Shampoo & Wash',
          'Facial / Black Mask',
          'Steam Treatment',
          'Scalp Massage',
          'Nose / Ear Waxing',
        ].map(service => (
          <p
            className={`italic ${!show.premium ? 'line-through text-gray-400' : ''}`}
            key={service}
          >
            {service}
          </p>
        ))}
      </div>

      <div>
        <p className="font-bold text-primary">Latin-Style Services</p>
        {[
          'Puerto Rican or Dominican Style Cuts',
          'Cut & Blow Dry Combo',
          'The Full Service',
        ].map(service => (
          <p
            className={`italic ${!show.latin ? 'line-through text-gray-400' : ''}`}
            key={service}
          >
            {service}
          </p>
        ))}
      </div>

      <div>
        <p className="font-bold text-primary">Grooming & Self-Care</p>
        {[
          'Facial Scrub',
          'Hydrating Facial',
          'Scalp Detox Treatment',
          'Color Touch-Up',
          'Hair Relaxer / Texturizer',
          'After-Cut Cologne Spray',
        ].map(service => (
          <p
            className={`italic ${!show.grooming ? 'line-through text-gray-400' : ''}`}
            key={service}
          >
            {service}
          </p>
        ))}
      </div>
    </div>
  )
}
