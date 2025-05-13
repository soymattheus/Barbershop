'use client'

import { Button } from '@/components/ui/button'
import { InputField, InputIcon, InputRoot } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Toast from '@/components/ui/toast'
import { Login } from '@/http/api'
import React from 'react'

const subscriptionSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
})

type SubscriptionSchema = z.infer<typeof subscriptionSchema>

export default function LoginScreen() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
  })

  async function onLogin({ email, password }: SubscriptionSchema) {
    const data = await Login({ email, password })

    const user = data.user
    const token = data.token

    if (user) {
      router.push('/homeUser') // navega para a rota /booking
    }
  }

  const handleresgisterScreen = () => {
    router.push('/register') // navega para a rota /booking
  }

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex w-full mx-auto items-center justify-center min-h-dvh md:gap-16 bg-blue"
    >
      <Toast />
      <div className="flex flex-col w-full md:w-2/4 p-8 gap-4 md:my-3 bg-primary md:rounded-2xl items-center justify-center">
        <h1 className="text-white text-center font-bold leading-none font-heading text-4xl">
          The Barrio Barbers
        </h1>

        <h1 className="text-white text-center font-bold leading-none font-heading text-3xl">
          Login
        </h1>

        {/* E-mail */}
        <div className="space-y-2 w-full md:w-8/12">
          <p>E-mail</p>
          <InputRoot error={!!errors?.email}>
            <InputIcon>
              <Mail className="size-6" />
            </InputIcon>
            <InputField
              type="text"
              placeholder="E-mail"
              {...register('email')}
            />
          </InputRoot>

          {errors?.email && (
            <p className="text-danger font-semibold text-xs">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2 w-full md:w-8/12">
          <p>Password</p>
          <InputRoot error={!!errors?.password}>
            <InputIcon>
              <Lock className="size-6" />
            </InputIcon>
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
            />
            <InputIcon>
              {showPassword ? (
                <Eye
                  className="size-6"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeClosed
                  className="size-6"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </InputIcon>
          </InputRoot>

          {errors?.password && (
            <p className="text-danger font-semibold text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex flex-col w-full gap-2 items-center">
          <Button type="submit">Login</Button>
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
            onClick={handleresgisterScreen}
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
    </form>
  )
}
