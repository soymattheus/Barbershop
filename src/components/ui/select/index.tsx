'use client'

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
  disabled?: boolean
}

export default function Select({
  description,
  data,
  selected,
  setSelected,
  error,
  disabled = false,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="service" className="text-sm font-semibold text-text">
        Choose a {description}
      </label>
      <select
        disabled={disabled}
        id="service"
        name="service"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        data-error={error}
        className="w-full rounded-lg border text-gray-700 p-3 disabled:bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary data-[error=true]:border-danger data-[error=true]:text-danger"
      >
        <option value="" disabled>
          -- Select a {description.toLowerCase()} --
        </option>
        {data.length > 0 &&
          data?.map((item, index) => (
            <option key={index} value={item?.value} className="text-gray-700">
              {item.label}
            </option>
          ))}
      </select>
    </div>
  )
}
