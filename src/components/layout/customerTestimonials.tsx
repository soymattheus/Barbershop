import { UserCircle } from 'lucide-react'

export default function CustomerTestimonials() {
  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 items-stretch">
      <div className="flex w-full items-center justify-center md:justify-start">
        <p className="text-text text-2xl text-bold">Customer Testimonials</p>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full mx-auto bg-white shadow-xl border border-yellow-400 rounded-2xl overflow-hidden transition hover:shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 bg-yellow-50 text-primary">
            <UserCircle className="w-8 h-8" />
            <p className="font-semibold text-sm md:text-base">
              April 6, 2025 — 12:36 PM
            </p>
          </div>

          <hr className="border-t border-yellow-300" />

          {/* Body */}
          <div className="flex flex-col gap-3 p-4 text-text">
            <p className="text-sm md:text-base leading-relaxed">
              “Hands down the best barbershop in town! Top-notch service, super
              chill atmosphere, and barbers who really know what they're doing.
              I walked out feeling fresh and confident. This place is my go-to
              from now on!”
            </p>
            <p className="font-bold italic self-end text-sm md:text-base">
              – Matheus Tavares
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
