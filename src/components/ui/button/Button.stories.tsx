import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HiOutlineCog } from 'react-icons/hi'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Click me',
  },
}

export const WithIcon: Story = {
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

export const Secondary: Story = {
  args: {
    children: 'Mais leve',
    className: 'bg-transparent text-black border-gray',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const Playground: Story = {
  args: {
    children: 'Playground',
    className: '',
  },
}
