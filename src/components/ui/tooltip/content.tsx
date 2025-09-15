'use client'

import type { CSSProperties, ReactNode } from 'react'
import type { PhysicalPlacement } from '@/types/ui/anchor'
import { cn } from '@/lib/utils'
import { toPositionArea } from '@/types/ui/anchor'
import { useTooltipContext } from './context'

export interface TooltipContentProps {
  children: ReactNode
  className?: string
  placement?: PhysicalPlacement
  anchorsVisible?: 'no-overflow' | 'anchors-visible'
}

export function TooltipContent({ children, className, placement = 'bottom', anchorsVisible }: TooltipContentProps) {
  const area = toPositionArea(placement)
  const { anchorName } = useTooltipContext()
  const style = {
    'position-area': area,
    'position-anchor': anchorName,
    'position-try-fallbacks': ' flip-block,flip-inline,flip-block flip-inline',
    // 'max-height': 'calc(anchor-size(height) * 2)',
    'position-visibility': anchorsVisible ?? 'anchors-visible',
  } as CSSProperties

  return (
    <div role="tooltip" className={cn('absolute opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black text-white rounded-lg', className)} style={style}>
      {children}
    </div>
  )
}
