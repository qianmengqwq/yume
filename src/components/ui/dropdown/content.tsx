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
        'absolute z-50 min-w-40 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg p-1',
        // Hover 模式下沿用透明度过渡由 PopoverContent 控制
        className,
      )}
      placement={placement}
      offset={offset}
      // toggle 模式交给 popover 元素管理
      popoverMode={mode === 'toggle' ? 'auto' : undefined}
      // 与触发器同宽 + 合并用户样式
      style={{ ...(sameWidth ? { width: 'anchor-size(inline)' } as CSSProperties : undefined), ...(userStyle as CSSProperties) }}
      tabIndex={-1}
    >
      {children}
    </PopoverContent>
  )
}
