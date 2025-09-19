import { createContext, useContext } from 'react'
import { useMounted } from '@/hooks/common/use-mounted'

const RootPortalContext = createContext<{
  to?: HTMLElement | undefined
}>({
  to: undefined,
})

export function useRootPortal() {
  const ctx = useContext(RootPortalContext)
  const mounted = useMounted()
  if (ctx.to)
    return ctx.to
  return mounted ? document.body : undefined
}

export const RootPortalProvider = RootPortalContext.Provider
