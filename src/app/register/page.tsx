'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const handleLoginScreen = () => {
    router.push('/login') // navega para a rota /booking
  }

  const handleLogin = () => {
    router.push('/homeUser') // navega para a rota /booking
  }

  return (
    <div className="flex w-full mx-auto items-center justify-center min-h-dvh gap-4 md:gap-16 bg-blue">
      <div className="flex flex-col w-11/12 md:w-2/4 p-8 gap-4 my-3 bg-primary rounded-2xl items-center justify-center">
        <h1 className="text-white text-center font-bold leading-none font-heading text-4xl">
          The Barrio Barbers
        </h1>

        <h1 className="text-white text-center font-bold leading-none font-heading text-3xl">
          Register
        </h1>

        {/* E-mail */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 items-start">
          <label htmlFor="email" className="text-sm font-semibold text-white">
            E-mail:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="example@emial.com"
            // value="Matheus Tavares"
            onChange={() => {}}
            className="p-2 rounded-md border border-white w-full"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 items-start">
          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            // value="Matheus Tavares"
            onChange={() => {}}
            className="p-2 rounded-md border border-white w-full"
          />
        </div>

        {/* Confirm password */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 items-start">
          <label htmlFor="confirmPassword" className="text-white">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter your password"
            // value="Matheus Tavares"
            onChange={() => {}}
            className="p-2 rounded-md border border-white w-full"
          />
        </div>

        {/* Button */}
        <div className="flex flex-col w-full gap-2 items-center">
          <Button onClick={handleLogin}>Register</Button>
        </div>

        <div className="flex flex-col w-full md:w-1/2 gap-2 items-center">
          <p>Enter with your google account</p>

          <img
            alt="Google"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
            className="size-7 cursor-pointer"
          />

          <button
            type="button"
            onClick={handleLoginScreen}
            className="hover:underline text-center cursor-pointer"
          >
            Or click here to create your account
          </button>
        </div>

        <hr className="w-full m-2 text-white" />

        {/* Copyright */}
        <div className="flex flex-col w-full gap-2 items-center">
          <p className="text-xs">
            {' '}
            2025, All rights reserved - Matheus Tavares
          </p>
        </div>
      </div>
    </div>
  )
}
