'use client'

import type { CSSProperties, ReactNode } from 'react'
import type { Offset, PhysicalPlacement } from '@/types/ui/anchor'
import { PopoverContent } from '@/components/primitive/popover/content'
import { cn } from '@/lib/utils'
import { useDropdownContext } from './context'

export interface DropdownContentProps {
  children: ReactNode
  className?: string
  placement?: PhysicalPlacement
  sameWidth?: boolean
  offset?: Offset
  style?: CSSProperties
}

export function DropdownContent({ children, className, placement = 'bottom-left', sameWidth = false, offset, style: userStyle }: DropdownContentProps) {
  const { mode } = useDropdownContext()
  return (
    <PopoverContent
      role="menu"
      className={cn(
        'absolute rounded-md border border-border bg-background-kawaii shadow-lg p-1',
        className,
      )}
      placement={placement}
      offset={offset}
      popoverMode={mode === 'toggle' ? 'auto' : undefined}
      style={{ ...(sameWidth ? { width: 'anchor-size(inline)' } as CSSProperties : undefined), ...(userStyle as CSSProperties) }}
      tabIndex={-1}
    >
      {children}
    </PopoverContent>
  )
}
