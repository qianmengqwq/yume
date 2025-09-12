'use client'

import type { PropsWithChildren } from 'react'
import { FontProvider } from './font-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute={['class', 'data-theme']}
      defaultTheme="system"
      enableSystem
    >
      <FontProvider>
        {children}
      </FontProvider>
    </ThemeProvider>
  )
}
