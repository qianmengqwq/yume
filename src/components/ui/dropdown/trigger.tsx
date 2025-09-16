'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { PopoverTrigger } from '@/components/primitive/popover/trigger'
import { useDropdownContext } from './context'

export interface DropdownTriggerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

export function DropdownTrigger({ children, className, ...rest }: DropdownTriggerProps) {
  const { mode } = useDropdownContext()
  return (
    <PopoverTrigger as={mode === 'toggle' ? 'button' : 'span'} className={className} aria-haspopup="menu" {...rest}>
      {children}
    </PopoverTrigger>
  )
}
