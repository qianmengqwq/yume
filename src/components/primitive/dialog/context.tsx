'use client'

import { createContext, useContext } from 'react'

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  labelId: string | undefined
  descriptionId: string | undefined
  setLabelId: (id: string | undefined) => void
  setDescriptionId: (id: string | undefined) => void
  modal: boolean
  closeOnEscape: boolean
  closeOnOutsideClick: boolean
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

export function useDialogContext() {
  const context = useContext(DialogContext)
  if (context === undefined)
    throw new Error('Dialog components must be used within <Dialog.Root>')
  return context
}

export const DialogProvider = DialogContext.Provider
