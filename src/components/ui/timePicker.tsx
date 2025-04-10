'use client'

import { useState } from 'react'

export default function TimePicker() {
  const [time, setTime] = useState('')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="time" className="text-sm font-semibold text-text">
        Choose a Time
      </label>
      <input
        type="time"
        id="time"
        name="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-text"
      />
    </div>
  )
}
