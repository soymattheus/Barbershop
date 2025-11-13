import { toast } from 'react-toastify'
import Toast from '.'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    success: { control: 'boolean' },
  },
}

export default meta

const Template = (args) => {
  const handleClick = () => {
    (args.success) ?
    toast.success('Handle success')
    :
    toast.error('Handle error')
  }
  return (
    <div>
      <button type='button' onClick={() => handleClick()}>Click</button>
      <Toast/>
    </div>
  )
}

export const Default = {
    render: Template,
    args: {
        success: true
    },
}
