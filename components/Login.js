import { Dialog } from '@headlessui/react'

function MyDialog ({ isOpen, toggle }) {
  return (
    <Dialog open={isOpen} onClose={toggle}>
      <Dialog.Overlay />

      <Dialog.Title>Masuk ke akaun anda 👋</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button onClick={toggle}>Login</button>
      <button onClick={toggle}>Cancel</button>
    </Dialog>
  )
}

export default MyDialog
