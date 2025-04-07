'use client'

import { Button } from '@/components/ui/button'
import { CircleUserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BookButtonProps {
  className?: string
}

export default function HeaderLoginButton({ className }: BookButtonProps) {
  const router = useRouter()
  const [isLogged, setIsLogged] = React.useState<boolean>(false)
  const [userName, setUserName] = React.useState<string>('Matheus Tavares')

  const handleLogin = () => {
    router.push('/login') // navega para a rota /booking
  }

  return !isLogged ? (
    <button
      type="button"
      onClick={handleLogin}
      className="flex items-center justify-center gap-2 cursor-pointer"
    >
      <CircleUserRound className="size-6" />
      <p className="font-semibold">Log in</p>
    </button>
  ) : (
    <div className="flex items-center justify-center gap-2">
      <CircleUserRound className="size-6" />
      <p className="font-semibold">{userName}</p>
    </div>
  )
}
