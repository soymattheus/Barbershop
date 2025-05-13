import type { ComponentProps } from 'react'

interface InputRootProps extends ComponentProps<'div'> {
  error?: boolean
}

export function InputRoot({ error = false, ...props }: InputRootProps) {
  return (
    <div
      data-error={error}
      className="group w-full border rounded-md p-2 flex items-center gap-2 focus-within:border-gray-100 data-[error=true]:border-danger"
      {...props}
    />
  )
}

interface InputIconProps extends ComponentProps<'span'> {}

export function InputIcon({ ...props }: InputIconProps) {
  return (
    <span
      className="text-gray-100 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown))]:text-gray-100 group-data-[error=true]:text-danger"
      {...props}
    />
  )
}

interface InputFieldProps extends ComponentProps<'input'> {}

export function InputField({ ...props }: InputFieldProps) {
  return (
    <input
      name="input-no-autocomplete"
      id="input-no-autocomplete"
      autoComplete="off"
      className="flex-1 outline-0 placeholder-gray-100"
      {...props}
    />
  )
}
