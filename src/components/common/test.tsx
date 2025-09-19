'use client'

import { Dialog } from '../primitive/dialog'

export function Test() {
  return (
    <Dialog.Root closeOnEscape={false} closeOnOutsideClick={false}>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog Description</Dialog.Description>
      </Dialog.Content>
      {/* <Dialog.Overlay /> */}
    </Dialog.Root>
  )
}
