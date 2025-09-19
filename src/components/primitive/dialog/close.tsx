import type { ButtonHTMLAttributes, PropsWithChildren, MouseEvent as ReactMouseEvent } from 'react'
import { useCallback } from 'react'
import { withAsChild } from '@/components/hoc/as-child'
import { cn } from '@/lib/utils'
import { useDialogContext } from './context'

type ButtonMouseEvent = ReactMouseEvent<HTMLButtonElement>

type DialogCloseBaseProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

function DialogCloseBase({ children, className, onClick, 'aria-label': ariaLabel, ...rest }: DialogCloseBaseProps) {
  const { setOpen } = useDialogContext()
  const fallbackLabel = 'Close dialog'
  const buttonLabel = ariaLabel ?? fallbackLabel

  const closeAndNotify = useCallback(
    (event: ButtonMouseEvent) => {
      onClick?.(event)
      if (event.defaultPrevented)
        return
      setOpen(false)
    },
    [onClick, setOpen],
  )

  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'float-right size-8',
        className,
      )}
      aria-label={buttonLabel}
      onClick={closeAndNotify}
    >
      {children ?? (
        <>
          <span aria-hidden="true" className="i-mingcute-close-line text-lg" />
          <span className="sr-only">{buttonLabel}</span>
        </>
      )}
    </button>
  )
}

export const DialogClose = withAsChild<DialogCloseBaseProps>(DialogCloseBase, {
  handlerProps: ['onClick'],
})

export type DialogCloseProps = Parameters<typeof DialogClose>[0]
