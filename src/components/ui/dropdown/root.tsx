'use client'

import type { ReactNode } from 'react'
import { PopoverRoot } from '@/components/primitive/popover/root'
import { cn } from '@/lib/utils'

export interface DropdownRootProps {
  children: ReactNode
  className?: string
  mode?: 'hover' | 'toggle'
}

export function DropdownRoot({ children, className, mode = 'toggle' }: DropdownRootProps) {
  return (
    <PopoverRoot className={cn('inline-block relative', className)} mode={mode}>
      {children}
    </PopoverRoot>
  )
}
