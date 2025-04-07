'use client'

import {
  BookmarkCheck,
  Image,
  Images,
  LogOut,
  UserCircle,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DrawerMenuProps {
  isOpen: boolean
}

export default function DrawerMenu({ isOpen = false }: DrawerMenuProps) {
  const router = useRouter()

  const handleProfile = () => {
    router.push('/profile')
  }

  const handleExit = () => {
    router.push('/')
  }

  return (
    <aside
      className={`${isOpen ? 'w-4/12 md:w-1/6 px-2' : 'w-0 opacity-0 scale-95 pointer-events-none select-none'} transition-all duration-300 bg-primary py-5`}
    >
      <div>
        {/* Conteúdo aqui */}
        <button
          type="button"
          onClick={handleProfile}
          className="flex flex-row w-full gap-1 cursor-pointer"
        >
          <UserCircle className="size-6" />
          <p>Profile</p>
        </button>

        <hr className="my-3" />

        <div className="flex flex-col w-full gap-3 items-start">
          <button
            type="button"
            className="flex flex-row cursor-pointer gap-0.5"
          >
            <BookmarkCheck />
            Bookings
          </button>
          <button
            type="button"
            className="flex flex-row cursor-pointer gap-0.5"
          >
            <Images />
            Galery
          </button>
          <button
            type="button"
            className="flex flex-row cursor-pointer gap-0.5"
          >
            <Users />
            About us
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="flex flex-row cursor-pointer gap-0.5"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
