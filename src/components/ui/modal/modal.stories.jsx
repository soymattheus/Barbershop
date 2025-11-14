import React from 'react'
import Modal from '.'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'false' },
    title: { control: 'text' },
  },
}

export default meta

const Template = (args) => {
    const [open, setOpen] = React.useState(args.isOpen);
    const handleClose = () => {
        setOpen(false);
        args.onClose?.();
    };

    React.useEffect(() => {
        setOpen(args.isOpen)
    }, [args.isOpen])

  return (
    <div>
        {!open &&
            <button type='button' onClick={() => setOpen(true)}>Open</button>
        }

        <Modal title={args.title} isOpen={open} onClose={() => handleClose()}>
            <h1>Here your can put anything you wanna.</h1>
        </Modal>
    </div>
  )
}

export const Default = {
  render: Template,
  args: {
    title: 'Here you put the modal title',
    isOpen: true
  },
}

export const Closed = {
  render: Template,
  args: {
    title: 'Here you put the modal title',
    isOpen: false
  },
}