import type { ButtonHTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { useCallback } from 'react'
import { withAsChild } from '@/components/hoc/as-child'
import { useDialogContext } from './context'

interface TriggerBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

function DialogTriggerBase({ children, onClick, ...rest }: TriggerBaseProps) {
  const { setOpen } = useDialogContext()

  const triggerClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (event.defaultPrevented)
        return
      setOpen(true)
    },
    [onClick, setOpen],
  )

  return (
    <button
      type="button"
      {...rest}
      onClick={triggerClick}
    >
      {children ?? 'Open dialog'}
    </button>
  )
}

export const DialogTrigger = withAsChild<TriggerBaseProps>(DialogTriggerBase, {
  handlerProps: ['onClick'],
})

export type DialogTriggerProps = Parameters<typeof DialogTrigger>[0]
