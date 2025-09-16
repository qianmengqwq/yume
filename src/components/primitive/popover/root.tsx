'use client'

import type { ReactNode } from 'react'
import { useId, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { PopoverProvider } from './context'

export interface PopoverRootProps {
  children: ReactNode
  className?: string
  mode?: 'hover' | 'toggle'
  hoverCloseDelay?: number
}

export function PopoverRoot({ children, className, mode = 'hover', hoverCloseDelay = 120 }: PopoverRootProps) {
  const [contentId, setContentId] = useState<string>()
  const [hoverOpen, setHoverOpen] = useState(false)
  const closeTimerRef = useRef<number | undefined>(undefined)
  const id = useId()
  const anchorName = `--popover-${id}`

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== undefined) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = undefined
    }
  }

  const onHoverEnter = () => {
    if (mode !== 'hover')
      return
    clearCloseTimer()
    setHoverOpen(true)
  }

  const onHoverLeave = () => {
    if (mode !== 'hover')
      return
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setHoverOpen(false)
      closeTimerRef.current = undefined
    }, hoverCloseDelay)
  }

  const context = useMemo(
    () => ({ anchorName, contentId, setContentId, mode, hoverOpen, setHoverOpen, onHoverEnter, onHoverLeave, hoverCloseDelay }),
    [anchorName, contentId, mode, hoverOpen, hoverCloseDelay],
  )
  return (
    <PopoverProvider value={context}>
      <div
        className={cn('grid justify-center', className)}
        onMouseEnter={mode === 'hover' ? onHoverEnter : undefined}
        onMouseLeave={mode === 'hover' ? onHoverLeave : undefined}
        onFocus={mode === 'hover' ? onHoverEnter : undefined}
        onBlur={mode === 'hover' ? onHoverLeave : undefined}
      >
        {children}
      </div>
    </PopoverProvider>
  )
}
