'use client'

import Footer from '@/components/layout/footer'
import {
  ArrowLeft,
  BookmarkCheck,
  Images,
  LogOut,
  Menu,
  UserCircle,
  Users,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { IconButton } from '../ui/iconButton'

interface DrawerProps {
  children?: React.ReactNode
}

export default function DrawerTest({ children }: DrawerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleProfile = () => {
    router.push('/profile')
  }

  const handleExit = () => {
    router.push('/')
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-1 flex-row">
        {/* Drawer */}
        <aside
          className={`${isOpen ? 'w-4/12 md:w-1/6 px-2' : 'w-0 opacity-0 scale-95 pointer-events-none select-none'} transition-all duration-300 bg-primary py-5`}
        >
          <div>
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

        <div
          className={`flex flex-col flex-1 gap-4 md:gap-8 transition-all duration-300 bg-blue
        ${isOpen ? 'w-8/12 md:w-5/6' : 'w-full'}`}
        >
          {/* Header */}
          <div className="flex flex-row w-full items-center justify-between h-14 gap-8 px-6 py-2 bg-primary">
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ArrowLeft /> : <Menu />}
            </IconButton>

            {pathname !== '/booking' && (
              <div
                className={`flex items-center ${!isOpen ? 'block' : 'hidden md:block'}`}
              >
                <Button className="flex items-center">Book now</Button>
              </div>
            )}
          </div>

          {/* Main content */}
          <div>{children}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
