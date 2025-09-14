import type { PropsWithChildren } from 'react'
import { Provider } from 'jotai'

export function JotaiProvider({ children }: PropsWithChildren) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
