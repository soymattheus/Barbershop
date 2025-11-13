import { HiOutlineCog } from 'react-icons/hi'
import { IconButton } from '.'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export default meta

export const Default = {
  args: {
    children: <HiOutlineCog className="text-gray-700 text-2xl" />,
  },
}

export const Disabled = {
  args: {
    children: <HiOutlineCog />,
    disabled: true,
  },
}

export const CustomClass = {
  args: {
    children: <HiOutlineCog />,
    className: 'bg-blue-200 hover:bg-blue-300',
  },
}
