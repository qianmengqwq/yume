import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import { useRootPortal } from './provider'

export function RootPortal(props: {
  to?: HTMLElement
} & PropsWithChildren) {
  const to = useRootPortal()
  // ssr
  if (!to)
    return null
  return createPortal(props.children, to)
}
