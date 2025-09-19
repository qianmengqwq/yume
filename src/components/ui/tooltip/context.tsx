'use client'

import type { ReactNode } from 'react'
import type { PopoverContextType } from '@/components/primitive/popover/context'
import { createComponentContext } from '@/components/hoc/create-component-context'
import { usePopoverContext } from '@/components/primitive/popover/context'

const [TooltipContextProvider, useTooltipContextBase] = createComponentContext<PopoverContextType>({
  name: 'Tooltip',
  errorMessage: 'Tooltip 组件必须在 <Tooltip.Root> 内部使用',
})

interface TooltipProviderProps {
  children: ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  const popover = usePopoverContext()
  return <TooltipContextProvider value={popover}>{children}</TooltipContextProvider>
}

export const useTooltipContext = useTooltipContextBase
