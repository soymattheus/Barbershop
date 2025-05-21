'use client'
import type { FieldError } from 'react-hook-form'

// se estiver usando App Router

interface OptionProps {
  value: string
  label: string
}

interface SelectProps {
  description: string
  data: OptionProps[]
  selected: string
  setSelected: (value: string) => void
  error?: boolean
}

export default function Select({
  description,
  data,
  selected,
  setSelected,
  error,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="service" className="text-sm font-semibold text-text">
        Choose a {description}
      </label>
      <select
        id="service"
        name="service"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        data-error={error}
        className="w-full rounded-lg border text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
      >
        <option value="" disabled>
          -- Select a {description.toLowerCase()} --
        </option>
        {data.map((item, index) => (
          <option key={index} value={item.value} className="text-gray-700">
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
