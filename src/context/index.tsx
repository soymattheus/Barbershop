'use client' // Isso força esse componente a ser renderizado apenas no cliente

import { LanguageProvider } from './languageContext'

export default function ContextApp({
  children,
}: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
