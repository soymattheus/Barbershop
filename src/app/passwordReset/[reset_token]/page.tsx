'use client'

import { Button } from '@/components/ui/button'
import { InputField, InputIcon, InputRoot } from '@/components/ui/input'
import Toast from '@/components/ui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { LoaderSpinner } from '@/components/ui/loader'
import { useAuth } from '@/hooks/auth'

const subscriptionSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SubscriptionSchema = z.infer<typeof subscriptionSchema>

export default function RegisterScreen() {
  const params = useParams()
  const reset_token = params.reset_token as string
  const { isLoading, handleResetPassword } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
  })

  async function onSubscribe({ password }: SubscriptionSchema) {
    handleResetPassword(reset_token, password, setValue)
  }

  return (
    <>
      <LoaderSpinner isLoading={isLoading} />
      <form
        onSubmit={handleSubmit(onSubscribe)}
        className="flex w-full mx-auto items-center justify-center min-h-dvh md:gap-16 bg-primary md:bg-blue"
      >
        <Toast />
        <div className="flex flex-col w-full md:w-2/4 p-8 gap-4 md:my-3 bg-primary md:rounded-2xl items-center justify-center">
          <h1 className="text-white text-center font-bold leading-none font-heading text-4xl">
            The Barrio Barbers
          </h1>

          <h1 className="text-white text-center font-bold leading-none font-heading text-3xl">
            Password Reset
          </h1>

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

          {/* Confirm password */}
          <div className="space-y-2 w-full md:w-8/12">
            <p>Confirm Password</p>
            <InputRoot error={!!errors?.confirmPassword}>
              <InputIcon>
                <Lock className="size-6" />
              </InputIcon>
              <InputField
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword')}
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

            {errors?.confirmPassword && (
              <p className="text-danger font-semibold text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="flex flex-col w-full gap-2 items-center">
            <Button type="submit">Reset</Button>
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
