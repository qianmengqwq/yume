import type { PropsWithChildren, ReactNode } from 'react'
import { createContext, useContext } from 'react'

interface CreateComponentContextOptions {
  name: string
  errorMessage?: string
}

interface ProviderProps<T> {
  value: T
  children: ReactNode
}

export function createComponentContext<T>({ name, errorMessage }: CreateComponentContextOptions) {
  const Context = createContext<T | undefined>(undefined)

  const Provider = ({ value, children }: PropsWithChildren<ProviderProps<T>>) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  )

  Provider.displayName = `${name}Provider`

  const useComponentContext = () => {
    const ctx = useContext(Context)
    if (ctx === undefined)
      throw new Error(errorMessage ?? `${name} context is missing. Make sure to wrap components in ${name}.Provider`)
    return ctx
  }

  return [Provider, useComponentContext] as const
}
