import React from 'react'
import { HiOutlineCog } from 'react-icons/hi'
import { Button } from '.'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export default meta

export const Primary = {
  args: {
    children: 'Click me',
  },
}

export const WithIcon = {
  render: args => (
    <Button {...args} className={args.className}>
      <span className="flex items-center gap-2">
        <HiOutlineCog />
        <span>Settings</span>
      </span>
    </Button>
  ),
  args: {
    className: 'bg-primary text-white',
  },
}

export const Disabled = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}
