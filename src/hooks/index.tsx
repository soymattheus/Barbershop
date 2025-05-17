import PagesProvider from '@/providers'
import type React from 'react'
import type { JSX } from 'react'
import { AuthProvider } from './auth'

function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AuthProvider>
      <PagesProvider>{children}</PagesProvider>
    </AuthProvider>
  )
}

export default AppProvider
