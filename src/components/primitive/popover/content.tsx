'use client'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { Offset, PhysicalPlacement } from '@/types/ui/anchor'
import { useEffect, useId } from 'react'
import { cn } from '@/lib/utils'
import { toPositionArea, toTransformOffset } from '@/types/ui/anchor'
import { usePopoverContext } from './context'
// import { toPositionStyle } from '@/types/ui/anchor'

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  placement?: PhysicalPlacement
  anchorsVisible?: 'no-overflow' | 'anchors-visible'
  duration?: number
  offset?: Offset
  id?: string
  popoverMode?: 'manual' | 'auto'
}

export function PopoverContent({ children, className, placement = 'bottom', anchorsVisible, duration = 200, offset, id, popoverMode = 'auto', style: userStyle, ...rest }: PopoverContentProps) {
  const contentId = id || useId()
  const { anchorName, setContentId, mode, hoverOpen, onHoverEnter, onHoverLeave } = usePopoverContext()

  useEffect(() => {
    setContentId(contentId)
  }, [contentId, setContentId])

  //   const positionStyles = toPositionStyle(placement, { x: offset?.x || 0, y: offset?.y || 0 }, anchorName)
  const transform = toTransformOffset(offset?.x || 0, offset?.y || 0)
  const area = toPositionArea(placement)
  const style = {
    // ...positionStyles,
    // 'max-height': 'calc(anchor-size(height) * 2)',
    positionArea: area,
    positionAnchor: anchorName,
    positionTryFallbacks: 'flip-block,flip-inline,flip-block flip-inline',
    positionVisibility: anchorsVisible ?? 'anchors-visible',
    transform,
  } as CSSProperties

  return (
    <div
      id={contentId}
      className={cn(
        'absolute',
        mode === 'hover' && 'transition-opacity',
        mode === 'hover' && duration && `duration-${duration}`,
        mode === 'hover' && (hoverOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'),
        className,
      )}
      style={{ ...style, ...(userStyle as CSSProperties) }}
      popover={mode === 'toggle' ? popoverMode : undefined}
      onMouseEnter={mode === 'hover' ? onHoverEnter : undefined}
      onMouseLeave={mode === 'hover' ? onHoverLeave : undefined}
      onFocus={mode === 'hover' ? onHoverEnter : undefined}
      onBlur={mode === 'hover' ? onHoverLeave : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
