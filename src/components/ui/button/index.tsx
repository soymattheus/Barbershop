import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex justify-between items-center px-2 h-7 bg-primary text-white border border-blue font-semibold rounded-xl cursor-pointer transition-colors duration-300 hover:bg-blue hover:text-primary disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
}
