'use client'

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'

export interface DropdownItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode
  inset?: boolean
  ref?: Ref<HTMLButtonElement>
}

export function DropdownItem({ children, className, inset, ref, ...rest }: DropdownItemProps) {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={cn(
        'w-full select-none rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        inset && 'pl-8',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
