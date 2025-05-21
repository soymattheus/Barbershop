'use client'

import { CircleUserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BookButtonProps {
  className?: string
}

export default function HeaderLoginButton({ className }: BookButtonProps) {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
    >
      <CircleUserRound className="size-6" />
      <p className="font-semibold">Log in</p>
    </button>
  )
}
