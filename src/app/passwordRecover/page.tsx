'use client'

import { Button } from '@/components/ui/button'
import { InputField, InputIcon, InputRoot } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { LoaderSpinner } from '@/components/ui/loader'
import Toast from '@/components/ui/toast'
import { useAuth } from '@/hooks/auth'

const subscriptionSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

type SubscriptionSchema = z.infer<typeof subscriptionSchema>

export default function LoginScreen() {
  const { handlePasswordRecover, isLoading } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
  })

  async function onRecoveryEmail({ email }: SubscriptionSchema) {
    handlePasswordRecover(email)
  }

  const handleLoginScreen = () => {
    router.push('/login')
  }

  return (
    <>
      <LoaderSpinner isLoading={isLoading} />
      <form
        onSubmit={handleSubmit(onRecoveryEmail)}
        className="flex w-full mx-auto items-center justify-center min-h-dvh md:gap-16 bg-primary md:bg-blue"
      >
        <Toast />
        <div className="flex flex-col w-full md:w-2/4 p-8 gap-4 md:my-3 bg-primary md:rounded-2xl items-center justify-center">
          <h1 className="text-white text-center font-bold leading-none font-heading text-4xl">
            The Barrio Barbers
          </h1>

          <h1 className="text-white text-center font-bold leading-none font-heading text-3xl">
            Password Recover
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

          {/* Button */}
          <div className="flex flex-col w-full gap-2 items-center">
            <Button type="submit">Request Token</Button>
          </div>

          <div className="flex flex-col w-full md:w-1/2 gap-2 items-center">
            <button
              type="button"
              onClick={handleLoginScreen}
              className="hover:underline text-center cursor-pointer"
            >
              Click here to log in
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
    </>
  )
}
