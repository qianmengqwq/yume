'use client'

import { createContext, useContext } from 'react'

export interface PopoverContextType {
  anchorName: string
  contentId: string | undefined
  setContentId: (id: string) => void
  mode: 'hover' | 'toggle'
  hoverOpen?: boolean
  setHoverOpen?: (open: boolean) => void
  onHoverEnter?: () => void
  onHoverLeave?: () => void
  hoverCloseDelay?: number
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

export function usePopoverContext() {
  const context = useContext(PopoverContext)
  if (context === undefined) {
    throw new Error('usePopoverContext must be used within a PopoverRoot')
  }
  return context
}

export const PopoverProvider = PopoverContext.Provider
