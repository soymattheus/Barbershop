import { Globe, Radio } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

interface SwitchProps extends ComponentProps<'button'> {
  language: string
}

export function Switch({ language = 'EN', ...props }: SwitchProps) {
  return (
    <button
      className="relative h-7 flex items-center rounded-full p-3 transition border border-b-current"
      {...props}
    >
      {language}
      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
        <Globe className="w-4 h-4" />
      </div>
    </button>
  )
}
