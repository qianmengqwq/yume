'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { PopoverTrigger } from '@/components/primitive/popover/trigger'
import { useDropdownContext } from './context'

export interface DropdownTriggerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  asChild?: boolean
}

export function DropdownTrigger({ children, className, asChild, ...rest }: DropdownTriggerProps) {
  const { mode } = useDropdownContext()
  return (
    <PopoverTrigger
      as={mode === 'toggle' ? 'button' : 'span'}
      asChild={asChild}
      className={className}
      aria-haspopup="menu"
      {...rest}
    >
      {children}
    </PopoverTrigger>
  )
}
