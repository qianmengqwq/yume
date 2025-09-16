'use client'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { usePopoverContext } from './context'

export interface PopoverTriggerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  id?: string
  as?: 'button' | 'span' | 'div'
}

export function PopoverTrigger({ children, className, as = 'button', ...rest }: PopoverTriggerProps) {
  const { anchorName, contentId, mode, onHoverEnter, onHoverLeave } = usePopoverContext()

  const style = {
    'anchor-name': anchorName,
  } as CSSProperties

  if (as === 'button') {
    return (
      <button
        className={cn('inline-block select-none', className)}
        style={style}
        popoverTarget={mode === 'toggle' ? contentId : undefined}
        popoverTargetAction={mode === 'toggle' ? 'toggle' : undefined}
        {...rest}
        onMouseEnter={mode === 'hover' ? onHoverEnter : undefined}
        onMouseLeave={mode === 'hover' ? onHoverLeave : undefined}
        onFocus={mode === 'hover' ? onHoverEnter : undefined}
        onBlur={mode === 'hover' ? onHoverLeave : undefined}
      >
        {children}
      </button>
    )
  }

  const Comp = as
  return (
    <Comp
      className={cn('inline-block select-none', className)}
      style={style}
      onMouseEnter={mode === 'hover' ? onHoverEnter : undefined}
      onMouseLeave={mode === 'hover' ? onHoverLeave : undefined}
      onFocus={mode === 'hover' ? onHoverEnter : undefined}
      onBlur={mode === 'hover' ? onHoverLeave : undefined}
      {...rest}
    >
      {children}
    </Comp>
  )
}
