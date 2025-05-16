import App from 'next/app'
import type React from 'react'
import type { JSX } from 'react'
import { AuthProvider } from './auth'

function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>
}

export default AppProvider
