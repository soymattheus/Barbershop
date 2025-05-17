import type React from 'react'
import type { JSX } from 'react'
import { BookingProvider } from './booking'

function PagesProvider({
  children,
}: { children: React.ReactNode }): JSX.Element {
  return <BookingProvider>{children}</BookingProvider>
}

export default PagesProvider
