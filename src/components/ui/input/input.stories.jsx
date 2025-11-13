import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { action } from 'storybook/actions'
import { InputField, InputIcon, InputRoot } from '.'

const meta = {
  title: 'Components/Input',
  component: InputRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    error: { control: 'boolean' },
    defaultValue: { control: 'text' },
    // onChange será capturado pelas actions
    onChange: { action: 'changed' },
  },
}

export default meta

const Template = (args) => {
  return (
    <InputRoot error={args.error}>
      <InputIcon>
        <HiOutlineSearch className="text-gray-700" />
      </InputIcon>

      <InputField
        className="text-gray-700"
        placeholder={args.placeholder}
        disabled={args.disabled}
        defaultValue={args.defaultValue}
        onChange={args.onChange ?? action('changed')}
      />
    </InputRoot>
  )
}

export const Default = {
  render: Template,
  args: {
    placeholder: 'Type what you want',
    error: false,
    defaultValue: '',
  },
}

export const WithValue = {
  render: Template,
  args: {
    error: false,
    defaultValue: 'Has a default text',
  },
}

export const ErrorState = {
  render: Template,
  args: {
    error: true,
    defaultValue: '',
  },
}

export const Disabled = {
  render: Template,
  args: {
    error: false,
    defaultValue: '',
    disabled: true
  },
}
