'use client'

import type { ReactNode } from 'react'
import { PopoverTrigger } from '@/components/primitive/popover/trigger'

export interface TooltipTriggerProps {
  children: ReactNode
  className?: string
}

export function TooltipTrigger({ children, className }: TooltipTriggerProps) {
  return (
    <PopoverTrigger as="span" className={className}>
      {children}
    </PopoverTrigger>
  )
}
