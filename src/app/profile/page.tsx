'use client'

import AuthLayout from '@/components/layout/authLayout'
import Banner from '@/components/layout/banner'
import Table from '@/components/layout/table'
import { Button } from '@/components/ui/button'
import { enUS } from 'date-fns/locale/en-US'
import { type KeyboardEvent, type MouseEvent, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Chat from '@/components/layout/Chat'
import Toast from '@/components/ui/toast'
import { useAuth } from '@/hooks/auth'
import { useBooking } from '@/providers/booking'
import { useProfile } from '@/providers/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const profileSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required field',
  }),
  createdAt: z
    .date({
      required_error: 'Date is required',
      invalid_type_error: 'Invalid date',
    })
    .refine(
      date => {
        const today = new Date()
        today.setHours(23, 59, 59, 0) // zera hora, minuto, segundo e ms
        return date <= today
      },
      {
        message: 'Date must be today or in the future',
      }
    ),
  birthDate: z
    .date({
      required_error: 'Date is required',
      invalid_type_error: 'Invalid date',
    })
    .refine(
      date => {
        const today = new Date()
        today.setHours(23, 59, 59, 0) // zera hora, minuto, segundo e ms
        return date < today
      },
      {
        message: 'Date must be today or in the past',
      }
    ),
  phone: z.string().min(1, {
    message: 'Phone is required field',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required field',
    })
    .email({
      message: 'Invalid email address',
    }),
})

type ProfileSchema = z.infer<typeof profileSchema>

export default function Profile() {
  registerLocale('enUS', enUS)
  const router = useRouter()
  const { user } = useAuth()
  const {
    birthDate,
    setBirthDate,
    phone,
    setPhone,
    email,
    setEmail,
    handleUpdateUserData,
    name,
    setName,
    handleFetchUserData,
  } = useProfile()
  const { handleFetchBookingData, bookingData } = useBooking()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.user?.name || '',
      createdAt: user?.user?.createdAt
        ? new Date(user.user.createdAt)
        : new Date(),
      birthDate: birthDate ? new Date(birthDate) : new Date(),
      phone: phone || '',
      email: email || '',
    },
  })

  useEffect(() => {
    setValue('name', name || '')
    setValue('birthDate', birthDate ? new Date(birthDate) : new Date())
    setValue('phone', phone || '')
    setValue('email', email || '')
    setValue(
      'createdAt',
      user?.user?.createdAt ? new Date(user.user.createdAt) : new Date()
    )
  }, [birthDate, phone, email, setValue, name, user?.user?.createdAt])

  useEffect(() => {
    handleFetchUserData()
    handleFetchBookingData()
  }, [handleFetchUserData, handleFetchBookingData])

  const handleUpdate = async () => {
    handleUpdateUserData()
  }

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        <Toast />
        <Chat />
        {/* Body */}
        <div className="flex flex-col px-6 gap-4 md:gap-10">
          <Banner showNavigation page="Profile" />

          <div className="flex flex-col gap-1">
            <p className="text-text">
              Your current loyalty package:{' '}
              <span className="text-primary font-bold">
                {user?.user?.loyaltyPackage || "you don't have one yet"}
              </span>
            </p>
            <div className="flex flex-row gap-1">
              <p
                onClick={() => {
                  router.push('/pricing')
                }}
                onKeyDown={() => {
                  router.push('/pricing')
                }}
                className="text-primary text-sm hover:underline cursor-pointer"
              >
                Click here to see our packages
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleUpdate)}
          >
            {/* Name and date */}
            <div className="flex flex-wrap w-full justify-evenly md:flex-row gap-4">
              {/* Name */}
              <div className="flex flex-col w-full md:w-3/7 gap-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  value={name || ''}
                  onChange={e => {
                    const val = e.target.value
                    setName(val)
                    setValue('name', val, { shouldValidate: true })
                  }}
                  placeholder="Enter your name"
                  data-error={!!errors?.name}
                  className="w-full rounded-lg border border-gray-300 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
                />

                {errors?.name && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Birth Date */}
              <div className="flex flex-col w-full md:w-3/7 gap-2">
                <label
                  htmlFor="birthDate"
                  className="text-sm font-semibold text-text"
                >
                  Birth Date
                </label>
                <DatePicker
                  id="birthDate"
                  locale="enUS"
                  selected={new Date(birthDate || new Date())}
                  {...register('birthDate')}
                  onChange={date => {
                    setBirthDate(
                      date?.toISOString().split('T')[0] ||
                        new Date().toISOString().split('T')[0]
                    )
                    setValue(
                      'birthDate',
                      new Date(
                        date?.toISOString().split('T')[0] ||
                          new Date().toISOString().split('T')[0]
                      ),
                      {
                        shouldValidate: true,
                      }
                    )
                  }}
                  onChangeRaw={(
                    e?:
                      | MouseEvent<HTMLElement>
                      | KeyboardEvent<HTMLElement>
                      | undefined
                  ) => {
                    const target = e?.target as HTMLInputElement | undefined
                    if (!target?.value) {
                      return
                    }
                    let value = target.value.replace(/\D/g, '') // remove tudo que não é número

                    if (value.length >= 5) {
                      value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 8)}`
                    } else if (value.length >= 3) {
                      value = `${value.slice(0, 2)}-${value.slice(2, 4)}`
                    }

                    target.value = value
                  }}
                  className="w-full rounded-lg border border-gray-300 disabled:bg-gray-100 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-primary z-0"
                  dateFormat="MM-dd-yyyy"
                  placeholderText="MM-DD-YYYY"
                />

                {errors?.birthDate && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Cell phone, email and customer since */}
            <div className="flex flex-wrap w-full justify-evenly md:flex-row gap-4">
              {/* Phone */}
              <div className="flex flex-col w-full md:w-3/7 gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-text"
                >
                  Phone:
                </label>

                <input
                  type="text"
                  id="phone"
                  placeholder="Type your phone"
                  {...register('phone')}
                  value={phone || ''}
                  onChange={e => {
                    const masked = e.target.value.replace(
                      /^(\d{2})(\d{5})(\d{4})$/,
                      '+55 $1 $2-$3'
                    )
                    setPhone(masked)
                    setValue('phone', masked, { shouldValidate: true })
                  }}
                  maxLength={17}
                  data-error={errors?.phone}
                  className="w-full rounded-lg border border-gray-300 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
                />

                {errors?.phone && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* E-mail */}
              <div className="flex flex-col w-full md:w-3/7 gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-text"
                >
                  E-mail:
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Type your e-mail"
                  {...register('email')}
                  value={email || ''}
                  onChange={e => {
                    const val = e.target.value
                    setEmail(val)
                    setValue('email', val, { shouldValidate: true })
                  }}
                  data-error={!!errors?.email}
                  className="w-full rounded-lg border border-gray-300 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
                />

                {errors?.email && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Customer since */}
              <div className="flex flex-col w-full md:w-3/7 gap-2">
                <label
                  htmlFor="createdAt"
                  className="text-sm font-semibold text-text"
                >
                  Customer Since
                </label>
                <DatePicker
                  id="createdAt"
                  disabled
                  selected={
                    user?.user?.createdAt
                      ? new Date(user?.user?.createdAt)
                      : new Date()
                  }
                  {...register('createdAt')}
                  onChange={() => {}}
                  className="w-full rounded-lg border border-gray-300 disabled:bg-gray-100 text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-primary z-0"
                  dateFormat="MM-dd-yyyy"
                  placeholderText="Pick a date"
                />

                {errors?.createdAt && (
                  <p className="text-danger font-semibold text-xs">
                    {errors.createdAt.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row w-full justify-center">
              <Button type="submit">Update Data</Button>
            </div>
          </form>

          {/* Bookings */}
          <div className="flex flex-col w-full justify-center gap-2">
            <p className="text-text text-2xl text-bold text-center md:text-start">
              Appointments List
            </p>
            <Table bookingData={bookingData} />
          </div>
        </div>
        {/* End body */}
      </AuthLayout>
    </div>
  )
}
