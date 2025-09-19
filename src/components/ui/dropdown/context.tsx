'use client'

import type { ReactNode } from 'react'
import type { PopoverContextType } from '@/components/primitive/popover/context'
import { createComponentContext } from '@/components/hoc/create-component-context'
import { usePopoverContext } from '@/components/primitive/popover/context'

const [DropdownContextProvider, useDropdownContextBase] = createComponentContext<PopoverContextType>({
  name: 'Dropdown',
  errorMessage: 'Dropdown 组件必须在 <Dropdown.Root> 内部使用',
})

interface DropdownProviderProps {
  children: ReactNode
}

export function DropdownProvider({ children }: DropdownProviderProps) {
  const popover = usePopoverContext()
  return <DropdownContextProvider value={popover}>{children}</DropdownContextProvider>
}

export const useDropdownContext = useDropdownContextBase
