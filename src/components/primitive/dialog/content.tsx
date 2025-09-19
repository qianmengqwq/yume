import type { HTMLAttributes, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { useClickOutside } from '@/hooks/common/use-click-outside'
import { useDialogContext } from './context'

interface ContentProps extends HTMLAttributes<HTMLDialogElement> {
  children?: ReactNode
  dialogRef?: React.RefObject<HTMLDialogElement>
  className?: string
}

export function DialogContent({ children, dialogRef: dialogRefProp, onClick, className, ...rest }: ContentProps) {
  const { open, setOpen, labelId, descriptionId, modal, closeOnEscape, closeOnOutsideClick } = useDialogContext()
  const innerRef = useRef<HTMLDialogElement>(null)
  const dialogRef = dialogRefProp ?? innerRef

  useEffect(() => {
    const el = dialogRef.current
    if (!el)
      return

    if (open) {
      if (!el.open) {
        if (modal)
          el.showModal()
        else
          el.show()
      }
    }
    else {
      if (el.open)
        el.close()
    }
  }, [open, modal, dialogRef])

  useEffect(() => {
    const el = dialogRef.current
    if (!el)
      return

    const restoreModal = () => {
      if (!modal)
        return
      requestAnimationFrame(() => {
        const dialogEl = dialogRef.current
        if (!dialogEl || !open)
          return
        if (!dialogEl.open) {
          dialogEl.showModal()
        }
      })
    }

    const onCancel = (event: Event) => {
      if (!closeOnEscape) {
        event.preventDefault()
        event.stopImmediatePropagation?.()
        restoreModal()
        return
      }
      setOpen(false)
    }

    el.addEventListener('cancel', onCancel)
    return () => el.removeEventListener('cancel', onCancel)
  }, [dialogRef, closeOnEscape, modal, open, setOpen])

  const handleClick = useClickOutside(
    dialogRef,
    closeOnOutsideClick ? () => setOpen(false) : undefined,
    onClick,
  )

  if (!open)
    return null

  return (
    <dialog
      {...rest}
      ref={dialogRef}
      className={className}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      role={modal ? 'modal' : 'dialog'}
      onClick={handleClick}
    >
      {children}
    </dialog>
  )
}
