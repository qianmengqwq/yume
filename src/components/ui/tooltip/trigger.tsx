'use client'

import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useTooltipContext } from './context'

export interface TooltipTriggerProps {
  children: ReactNode
  className?: string
}

export function TooltipTrigger({ children, className }: TooltipTriggerProps) {
  const { anchorName } = useTooltipContext()

  const style = {
    'anchor-name': anchorName,
  } as CSSProperties

  return (
    <span
      className={cn('inline-block', className)}
      style={style}
    >
      {children}
    </span>
  )
}
