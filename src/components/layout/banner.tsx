'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface BannerProps {
  showButton?: boolean
  showNavigation?: boolean
  page?: string
}

export default function Banner({
  showButton = false,
  showNavigation = false,
  page = '',
}: BannerProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/booking') // navega para a rota /booking
  }
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full md:w-2/3 gap-4 items-center md:items-start">
        <h1 className="text-4xl text-primary leading-none font-heading font-medium flex flex-col md:text-6xl text-center md:text-left">
          The Barrio Barbers{' '}
          <span className="text-text text-2xl">Your Latin barber shop</span>
        </h1>
        <p
          className={`text-text leading-relaxed text-sm md:text-base ${showNavigation ? 'hidden' : 'flex'}`}
        >
          Book your appointment easily
        </p>

        <div className="flex flex-row w-full">
          <p
            className={`text-text leading-relaxed text-sm md:text-base ${showNavigation ? 'flex' : 'hidden'}`}
          >
            <span className="italic hover:underline cursor-pointer">Home</span>
            <span className="italic">{' > '}</span>
            <span className="italic font-bold">{page}</span>
          </p>
        </div>

        <Button
          onClick={handleClick}
          className={`bg-emphasis text-text ${showButton ? 'flex' : 'hidden'}`}
        >
          Book now
        </Button>
      </div>
      <div className="hidden md:flex w-1/3">
        <Image
          alt="Logo"
          src="/svg/undraw_barber_utly.svg"
          width={400}
          height={400}
        />
      </div>
    </div>
  )
}
