import { LoaderSpinner } from '.'

const meta = {
  title: 'Components/LoaderSpinner',
  component: LoaderSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    isLoading: true
  },
}
