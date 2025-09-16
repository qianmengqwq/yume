// src/components/primitive/popover/trigger.tsx
'use client'

import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode, SyntheticEvent } from 'react'
import { cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'
import { usePopoverContext } from './context'

type TriggerAttributes = HTMLAttributes<HTMLElement> & {
  popoverTarget?: string
  popoverTargetAction?: 'show' | 'hide' | 'toggle'
}

type EventHandler<E extends SyntheticEvent> = ((event: E) => void) | undefined

function composeEventHandlers<E extends SyntheticEvent>(...handlers: EventHandler<E>[]) {
  const present = handlers.filter(Boolean) as Array<(event: E) => void>
  if (present.length === 0)
    return undefined

  return (event: E) => {
    for (const handler of present) {
      handler(event)
      if (event.defaultPrevented)
        break
    }
  }
}

export interface PopoverTriggerProps extends TriggerAttributes {
  children: ReactNode
  className?: string
  id?: string
  as?: 'button' | 'span' | 'div'
  asChild?: boolean
}

export function PopoverTrigger({
  children,
  className,
  as = 'button',
  asChild = false,
  onMouseEnter: userMouseEnter,
  onMouseLeave: userMouseLeave,
  onFocus: userFocus,
  onBlur: userBlur,
  ...rest
}: PopoverTriggerProps) {
  const { anchorName, contentId, mode, onHoverEnter, onHoverLeave } = usePopoverContext()

  const style = { anchorName } as CSSProperties
  const enterHandler = composeEventHandlers(userMouseEnter, mode === 'hover' ? onHoverEnter : undefined)
  const leaveHandler = composeEventHandlers(userMouseLeave, mode === 'hover' ? onHoverLeave : undefined)
  const focusHandler = composeEventHandlers(userFocus, mode === 'hover' ? onHoverEnter : undefined)
  const blurHandler = composeEventHandlers(userBlur, mode === 'hover' ? onHoverLeave : undefined)

  if (asChild) {
    if (!isValidElement(children))
      throw new Error('PopoverTrigger with asChild expects a single valid React element')

    const child = children as ReactElement<TriggerAttributes>
    const childProps = child.props

    const mergedProps: TriggerAttributes = {
      ...childProps,
      ...rest,
      className: cn('inline-block select-none', childProps.className, className),
      style: { ...(childProps.style as CSSProperties | undefined), ...style },
      onMouseEnter: composeEventHandlers(childProps.onMouseEnter, enterHandler),
      onMouseLeave: composeEventHandlers(childProps.onMouseLeave, leaveHandler),
      onFocus: composeEventHandlers(childProps.onFocus, focusHandler),
      onBlur: composeEventHandlers(childProps.onBlur, blurHandler),
    }

    if (mode === 'toggle') {
      mergedProps.popoverTarget = contentId
      mergedProps.popoverTargetAction = 'toggle'
    }

    return cloneElement(child, mergedProps)
  }

  const Comp = as
  return (
    <Comp
      className={cn('inline-block select-none', className)}
      style={style}
      popoverTarget={mode === 'toggle' ? contentId : undefined}
      popoverTargetAction={mode === 'toggle' ? 'toggle' : undefined}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      {...rest}
    >
      {children}
    </Comp>
  )
}
