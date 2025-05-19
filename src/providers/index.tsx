import type React from 'react'
import type { JSX } from 'react'
import { BookingProvider } from './booking'
import { ProfileProvider } from './profile'

function PagesProvider({
  children,
}: { children: React.ReactNode }): JSX.Element {
  return (
    <BookingProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </BookingProvider>
  )
}

export default PagesProvider
