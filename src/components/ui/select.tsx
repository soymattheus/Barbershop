'use client' // se estiver usando App Router

interface OptionProps {
  value: string
  label: string
}

interface SelectProps {
  description: string
  data: OptionProps[]
  selected: string
  setSelected: (value: string) => void
}

export default function Select({
  description,
  data,
  selected,
  setSelected,
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
        className="p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary text-text"
      >
        <option value="" disabled>
          -- Select a {description.toLowerCase()} --
        </option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
