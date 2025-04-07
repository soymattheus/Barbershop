import { UserCircle } from 'lucide-react'

export default function CustomerTestimonials() {
  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 items-stretch">
      <div className="flex w-full items-center justify-center md:justify-start">
        <p className="text-text text-2xl text-bold">Customer Testimonials</p>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full bg-blue rounded-b-2xl">
          <div className="flex flex-row w-full gap-4 p-4 items-center bg-primary rounded-t-2xl">
            <UserCircle />
            <p className="text-text">2025 april 6, 12:36pm</p>
          </div>
          <hr className="m-2" />
          <div className="flex flex-col px-4 pb-4">
            <p className="text-text">
              " Hands down the best barbershop in town! Top-notch service, super
              chill atmosphere, and barbers who really know what they're doing.
              I walked out feeling fresh and confident. This place is my go-to
              from now on!"
            </p>
            <p className="text-text font-bold italic">- Matheus Tavares</p>
          </div>
        </div>
      </div>
    </div>
  )
}
