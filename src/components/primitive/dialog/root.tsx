import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { DialogProvider } from './context'

interface DialogRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
}

export function DialogRoot({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  modal = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(!!defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? !!openProp : uncontrolledOpen

  const setOpen = useCallback<(open: boolean) => void>((next) => {
    if (!isControlled)
      setUncontrolledOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  const [labelId, setLabelId] = useState<string | undefined>(undefined)
  const [descriptionId, setDescriptionId] = useState<string | undefined>(undefined)

  const value = useMemo(
    () => ({
      open,
      setOpen,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      modal,
      closeOnEscape,
      closeOnOutsideClick,
    }),
    [open, setOpen, labelId, descriptionId, modal, closeOnEscape, closeOnOutsideClick],
  )

  return <DialogProvider value={value}>{children}</DialogProvider>
}
