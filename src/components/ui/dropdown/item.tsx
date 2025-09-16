'use client'

import type { ReactNode, RefObject } from 'react'
import { cn } from '@/lib/utils'

export interface DropdownItemProps {
  children: ReactNode
  ref?: RefObject<HTMLButtonElement>
  className?: string
}

export function DropdownItem({ children, className, ref, ...rest }: DropdownItemProps) {
  return (
    <button
      ref={ref}
      role="menuitem"
      className={cn(
        'w-full select-none rounded px-4 py-2 text-left outline-none text-text',
        'hover:bg-background-secondary',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
