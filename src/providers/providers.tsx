'use client'

import type { PropsWithChildren } from 'react'
import { ModalStackContainer } from '@/components/ui/modal/container'
import { FontProvider } from './font-provider'
import { JotaiProvider } from './jotai-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute={['class', 'data-theme']}
      defaultTheme="system"
      enableSystem
    >
      <FontProvider>
        <JotaiProvider>
          <ModalStackContainer>
            {children}
          </ModalStackContainer>
        </JotaiProvider>
      </FontProvider>
    </ThemeProvider>
  )
}
