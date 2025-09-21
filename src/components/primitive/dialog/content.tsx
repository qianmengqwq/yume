import type { HTMLAttributes, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { withAsChild } from '@/components/hoc/as-child'
import { useClickOutside } from '@/hooks/common/use-click-outside'
import { useDialogContext } from './context'

interface ContentBaseProps extends HTMLAttributes<HTMLDialogElement> {
  children?: ReactNode
  dialogRef?: React.RefObject<HTMLDialogElement>
  className?: string
}

function DialogContentBase({ children, dialogRef: dialogRefProp, onClick, className, ...rest }: ContentBaseProps) {
  const { open, setOpen, labelId, descriptionId, closeOnEscape, closeOnOutsideClick } = useDialogContext()
  const innerRef = useRef<HTMLDialogElement>(null)
  const dialogRef = dialogRefProp ?? innerRef

  useEffect(() => {
    const el = dialogRef.current
    if (!el)
      return

    if (open && !el.open) {
      el.showModal()
    }
    else {
      if (el.open)
        el.close()
    }
  }, [open, dialogRef])

  useEffect(() => {
    const el = dialogRef.current
    if (!el)
      return

    const restoreModal = () => {
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
  }, [dialogRef, closeOnEscape, open, setOpen])

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
      role="modal"
      onClick={handleClick}
    >
      {children}
    </dialog>
  )
}

export const DialogContent = withAsChild<ContentBaseProps>(DialogContentBase, {
  handlerProps: ['onClick'],
})

export type DialogContentProps = Parameters<typeof DialogContent>[0]
