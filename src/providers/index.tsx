import type React from 'react'
import type { JSX } from 'react'
import { BookingProvider } from './booking'
import { ChatProvider } from './chat'
import { ProfileProvider } from './profile'

function PagesProvider({
  children,
}: { children: React.ReactNode }): JSX.Element {
  return (
    <BookingProvider>
      <ProfileProvider>
        <ChatProvider>{children}</ChatProvider>
      </ProfileProvider>
    </BookingProvider>
  )
}

export default PagesProvider
