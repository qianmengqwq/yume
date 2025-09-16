'use client'

import type { ReactNode } from 'react'
import type { Offset, PhysicalPlacement } from '@/types/ui/anchor'
import { PopoverContent } from '@/components/primitive/popover/content'
import { cn } from '@/lib/utils'

export interface TooltipContentProps {
  children: ReactNode
  className?: string
  placement?: PhysicalPlacement
  anchorsVisible?: 'no-overflow' | 'anchors-visible'
  duration?: number
  offset?: Offset
}

export function TooltipContent({ children, className, placement = 'bottom', anchorsVisible, duration = 200, offset }: TooltipContentProps) {
  return (
    <PopoverContent
      role="tooltip"
      className={cn('absolute bg-black text-white rounded-lg', className)}
      placement={placement}
      anchorsVisible={anchorsVisible}
      duration={duration}
      offset={offset}
    >
      {children}
    </PopoverContent>
  )
}
