'use client'

import Footer from '@/components/layout/footer'
import { useAuth } from '@/hooks/auth'
import {
  CircleDollarSign,
  Home,
  Images,
  LogOut,
  Menu,
  PanelLeftClose,
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

export default function AuthLayout({ children }: DrawerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, handleLogout } = useAuth()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  // Impede scroll do background quando sidebar estiver aberto
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.add('md:overflow-auto')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const handleProfile = () => {
    router.push('/profile')
  }

  const handleBooking = () => {
    router.push('/booking')
  }

  const handlePortal = () => {
    router.push('/portal')
  }

  const handlePricing = () => {
    router.push('/pricing')
  }

  const handleGalery = () => {
    router.push('/galery')
  }

  const handleAboutUs = () => {
    router.push('/aboutUs')
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-1 flex-row">
        {/* Drawer */}
        <aside
          className={`hidden md:flex transition-all duration-300 bg-primary text-white shadow-xl py-6
            ${isOpen ? 'w-1/5 px-4' : 'w-0 opacity-0 scale-95 pointer-events-none select-none'}
          `}
        >
          <div className="flex flex-col w-full h-full justify-between">
            <div className="flex flex-col gap-6">
              <button
                onClick={handlePortal}
                type="button"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
              >
                <Home className="text-yellow-400 w-5 h-5" />
                <span className="text-sm font-medium">Home</span>
              </button>

              <hr className="border-white/20" />

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                >
                  <UserCircle className="text-yellow-400 w-5 h-5" />
                  <span className="text-sm font-medium">Profile</span>
                </button>

                <button
                  onClick={handlePricing}
                  type="button"
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                >
                  <CircleDollarSign className="text-yellow-400 w-5 h-5" />
                  <span className="text-sm font-medium">Pricing</span>
                </button>

                <button
                  onClick={handleGalery}
                  type="button"
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                >
                  <Images className="text-yellow-400 w-5 h-5" />
                  <span className="text-sm font-medium">Gallery</span>
                </button>

                <button
                  onClick={handleAboutUs}
                  type="button"
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                >
                  <Users className="text-yellow-400 w-5 h-5" />
                  <span className="text-sm font-medium">About Us</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
            >
              <LogOut className="text-red-400 w-5 h-5" />
              <span className="text-sm font-medium text-red-200">Logout</span>
            </button>
          </div>
        </aside>

        {/* Sidebar mobile */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Overlay escuro */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
              onKeyDown={() => setIsOpen(false)}
            />

            {/* Sidebar deslizante */}
            <aside className="relative z-50 w-4/5 max-w-xs bg-primary text-white shadow-xl flex flex-col justify-start py-6 px-4 transform transition-transform duration-300 translate-x-0">
              {/* Topo com botão de fechar */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl hover:text-yellow-400 transition"
                >
                  &times;
                </button>
              </div>

              {/* Links do menu */}
              <div className="min-h-11/12 flex flex-col gap-8 justify-between">
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handlePortal}
                    type="button"
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <Home className="text-yellow-400 w-5 h-5" />
                    <span className="text-sm font-medium">Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleProfile}
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <UserCircle className="text-yellow-400 w-5 h-5" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>

                  <button
                    onClick={handlePricing}
                    type="button"
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <CircleDollarSign className="text-yellow-400 w-5 h-5" />
                    <span className="text-sm font-medium">Pricing</span>
                  </button>

                  <button
                    onClick={handleGalery}
                    type="button"
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <Images className="text-yellow-400 w-5 h-5" />
                    <span className="text-sm font-medium">Gallery</span>
                  </button>

                  <button
                    onClick={handleAboutUs}
                    type="button"
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <Users className="text-yellow-400 w-5 h-5" />
                    <span className="text-sm font-medium">About Us</span>
                  </button>
                </div>

                {/* Botão de logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-red-600/20 transition mt-8"
                >
                  <LogOut className="text-red-400 w-5 h-5" />
                  <span className="text-sm font-medium text-red-200">
                    Logout
                  </span>
                </button>
              </div>
            </aside>
          </div>
        )}

        <div
          className={`flex flex-col flex-1 gap-4 md:gap-8 transition-all duration-300
        ${isOpen ? 'w-full md:w-5/6' : 'w-full'}`}
        >
          {/* Header */}
          <div className="flex flex-row w-full items-center justify-between h-14 gap-8 px-6 py-2 bg-primary">
            <div className="flex flex-row items-center gap-2">
              <IconButton onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <PanelLeftClose /> : <Menu />}
              </IconButton>
              <p className="font-semibold">{user?.user?.name}</p>
            </div>

            {pathname !== '/booking' && (
              <div className="flex items-center">
                <Button onClick={handleBooking} className="flex items-center">
                  Book now
                </Button>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="pb-4 md:pb-10 md:px-3.5">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
