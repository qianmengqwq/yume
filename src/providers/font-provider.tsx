import type { PropsWithChildren } from 'react'
import { sansFont, serifFont } from '@/config/fonts'

export function FontProvider({ children }: PropsWithChildren) {
  return (
    <div
      className={`${sansFont.variable} ${serifFont.variable} font-sans antialiased`}
    >
      {children}
    </div>
  )
}
