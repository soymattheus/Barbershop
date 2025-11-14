import React from 'react'
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';
import Select from '.'

const mockServices = [
    {
        label: 'Classic Haircut',
        value: 25,
    },
    {
        label: 'Skin Fade / Bald Fade',
        value: 30,
    },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'boolean' },
  },
}

export default meta

// Wrapper que gerencia o estado selecionado para permitir interação nas stories
const _Select = (args) => {
  const [selected, setSelected] = React.useState(args.selected ?? '')
  const handleSelected = (e) => {
    setSelected(e)
    args.setSelected?.();
  }
  return (
    <div style={{ width: 360 }}>
      <Select
        {...args}
        description={args.description}
        data={args.services}
        selected={selected}
        setSelected={(e) => handleSelected(e)}
      />
      <div style={{ marginTop: 12, fontSize: 13 }}>Selected: {selected}</div>
    </div>
  )
}

export const Default = {
  render: args => <_Select {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: '',
    error: false,
  },
}

export const EmptyServices = {
  render: args => <_Select {...args} />,
  args: {
    description: 'Service',
    services: [],
    selected: '',
    error: false,
  },
}

export const Preselected = {
  render: args => <_Select {...args} />,
  args: {
    description: 'Service',
    services: mockServices,
    selected: 25,
    error: false,
  },
}