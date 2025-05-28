'use client'

import type { ServiceGroup } from '@/types/service'
import React from 'react'

interface GroupSelectProps {
  description: string
  services: ServiceGroup[]
  selected: string
  setSelected: (value: string) => void
  error?: boolean
}

export default function GroupSelect({
  description,
  services,
  selected,
  setSelected,
  error,
}: GroupSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="service" className="text-sm font-semibold text-text">
        Choose a {description}
      </label>
      <select
        id="service"
        value={selected}
        onChange={e => setSelected(e.target.value || '')}
        data-error={error}
        className="w-full rounded-lg border text-gray-700 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
      >
        <option value="" disabled>
          -- Select a {description.toLowerCase()} --
        </option>

        {services.length > 0 &&
          services?.map(category => (
            <optgroup
              key={category?.title}
              label={category?.title}
              className="text-gray-500"
            >
              {category?.services.map(service => (
                <option
                  key={service.name}
                  value={`${service.id}`}
                  className="text-gray-700"
                >
                  {service.name} - ${service.price}
                </option>
              ))}
            </optgroup>
          ))}
      </select>
    </div>
  )
}
