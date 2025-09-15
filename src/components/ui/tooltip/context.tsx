'use client'

import { createContext, useContext } from 'react'

interface TooltipContextType {
  anchorName: string
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined)

export function useTooltipContext() {
  const context = useContext(TooltipContext)
  if (context === undefined) {
    throw new Error('useTooltipContext must be used within a TooltipRoot')
  }
  return context
}

export const TooltipProvider = TooltipContext.Provider
