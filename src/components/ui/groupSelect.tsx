'use client'

import type { ServiceGroup } from '@/types/service'
import React from 'react'

interface GroupSelectProps {
  description: string
  services: ServiceGroup[]
  selected: string
  setSelected: (value: string) => void
}

export default function GroupSelect({
  description,
  services,
  selected,
  setSelected,
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
        className="p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary text-text"
      >
        <option value="" disabled>
          -- Select a {description.toLowerCase()} --
        </option>

        {services.map(category => (
          <optgroup key={category.title} label={category.title}>
            {category.services.map(service => (
              <option
                key={service.name}
                value={`${service.name} - $${service.price}`}
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
