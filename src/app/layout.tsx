import './globals.css'
import ContextApp from '@/context'

import type { Metadata } from 'next'
import { Montserrat, Oxanium } from 'next/font/google'

export const metadata: Metadata = {
  title: 'The Barrio Barbers',
  description: 'Your Latin barber shop',
}

const oxanium = Oxanium({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-oxanium',
})

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${oxanium.variable}`}>
      <body className="min-w-[320px] bg-secondary text-gray-100">
        <main className="mx-auto flex">
          <ContextApp>{children}</ContextApp>
        </main>
      </body>
    </html>
  )
}
