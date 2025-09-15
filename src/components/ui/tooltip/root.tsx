'use client'

import type { ReactNode } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { TooltipProvider } from './context'

export interface TooltipRootProps {
  children: ReactNode
  className?: string
}

export function TooltipRoot({ children, className }: TooltipRootProps) {
  const id = useId()
  const anchorName = `--tooltip-${id}`
  return (
    <TooltipProvider value={{ anchorName }}>
      <div className={cn('group grid justify-center', className)}>
        {children}
      </div>
    </TooltipProvider>
  )
}
