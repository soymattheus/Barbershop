'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface BookButtonProps {
  className?: string
}

export default function HeaderBookButton({ className }: BookButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/login') // navega para a rota /booking
  }

  return (
    <Button className={className} onClick={handleClick}>
      Book now
    </Button>
  )
}
