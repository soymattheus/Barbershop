import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {}

export function IconButton({ className, ...props }: ButtonProps) {
  return (
    <button
      aria-label="reusable-button"
      aria-hidden="false"
      className={twMerge(
        'p-1.5 text-blue rounded-md cursor-pointer transition-colors duration-300 border-white hover:border',
        className
      )}
      {...props}
    />
  )
}
