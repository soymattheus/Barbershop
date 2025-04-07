'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, CircleUserRound, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BookButtonProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function HeaderDrawerButton({
  isOpen,
  setIsOpen,
}: BookButtonProps) {
  const router = useRouter()
  const [showDrawer, setshowDrawer] = React.useState<boolean>(false)
  const [userName, setUserName] = React.useState<string>('Matheus Tavares')

  const handleLogin = () => {
    router.push('/login') // navega para a rota /booking
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {!isOpen ? (
        <Menu onClick={() => setIsOpen(true)} className="size-6" />
      ) : (
        <ArrowLeft onClick={() => setIsOpen(false)} className="size-6" />
      )}
      <p className="font-semibold">{userName}</p>
    </div>
  )
}
