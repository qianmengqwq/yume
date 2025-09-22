import type { PropsWithChildren } from 'react'
import { aboretoFont, sansFont, serifFont } from '@/config/fonts'

export function FontProvider({ children }: PropsWithChildren) {
  return (
    <div
      className={`${sansFont.variable} ${serifFont.variable} ${aboretoFont.variable} font-sans antialiased`}
    >
      {children}
    </div>
  )
}
