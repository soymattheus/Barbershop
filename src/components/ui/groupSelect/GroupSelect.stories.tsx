import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import GroupSelect from '.'

import type { ServiceGroup } from '@/types/service'

interface GroupSelectProps {
  description: string
  services: ServiceGroup[]
  selected: string
  setSelected: (value: string) => void
  error?: boolean
}

const mockServices: ServiceGroup[] = [
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

const meta: Meta<typeof GroupSelect> = {
  title: 'Components/GroupSelect',
  component: GroupSelect,
  tags: ['autodocs'],
  argTypes: {
    description: { control: 'text' },
    error: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof GroupSelect>

// Wrapper que gerencia o estado selecionado para permitir interação nas stories
function InteractiveTemplate(args: GroupSelectProps) {
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

export const Default: Story = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: '',
    error: false,
  },
}

export const WithError: Story = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: '',
    error: true,
  },
}

export const EmptyServices: Story = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: [],
    selected: '',
    error: false,
  },
}

export const Preselected: Story = {
  render: args => <InteractiveTemplate {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: '2',
    error: false,
  },
}

// Observações:
// - As stories usam um template interativo (useState) porque o componente espera receber
//   `selected` + `setSelected` do pai. Isso permite testar seleção diretamente no Storybook.
// - Se você tiver as types reais em '@/types/service', substitua os tipos mock neste arquivo
//   e importe as fixtures reais.
// - Ajuste o estilo do container no template para refletir o layout do seu app (width, spacing, etc.).
