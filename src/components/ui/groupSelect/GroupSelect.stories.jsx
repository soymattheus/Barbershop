import React, { useState } from 'react'
import GroupSelect from '.'

const mockServices = [
  {
    title: 'Hair',
    services: [
      {
        serviceId: 'a1f5d8b2-1e0d-4e3c-b8d1-90f1b8a1c001',
        name: 'Classic Haircut',
        price: 25,
      },
      {
        serviceId: 'a1f5d8b2-1e0d-4e3c-b8d1-90f1b8a1c002',
        name: 'Skin Fade / Bald Fade',
        price: 30,
      },
    ],
  },
  {
    title: 'Spa',
    services: [
      {
        serviceId: 'a1f5d8b2-1e0d-4e3c-b8d1-90f1b8a1c003',
        name: 'Taper Fade',
        price: 28,
      },
    ],
  },
]

const meta = {
  title: 'Components/GroupSelect',
  component: GroupSelect,
  tags: ['autodocs'],
  argTypes: {
    description: { control: 'text' },
    error: { control: 'boolean' },
  },
}

export default meta

// Wrapper que gerencia o estado selecionado para permitir interação nas stories
function InteractiveTemplate(args) {
  const [selected, setSelected] = useState(args.selected ?? '')
  return (
    <div style={{ width: 360 }}>
      <GroupSelect
        {...args}
        services={args.services}
        selected={selected}
        setSelected={setSelected}
      />
      <div style={{ marginTop: 12, fontSize: 13 }}>Selected: {selected}</div>
    </div>
  )
}

export const Default = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: '',
    error: false,
  },
}

export const WithError = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: '',
    error: false,
  },
}

export const EmptyServices = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: [],
    selected: '',
    error: false,
  },
}

export const Preselected = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: 'a1f5d8b2-1e0d-4e3c-b8d1-90f1b8a1c001',
    error: false,
  },
}