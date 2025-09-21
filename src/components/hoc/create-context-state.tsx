// 自管状态

import React, { createContext, useContext, useState } from 'react'

function throwError() {
  throw new Error('setState must be used within a Provider with a value')
}

export function createContextState<T>(initialState: T, displayName?: string) {
  const StateContext = createContext<T>(initialState)
  const DispatchContext
    = createContext<React.Dispatch<React.SetStateAction<T>>>(throwError)

  const useValue = () => useContext(StateContext)
  const useSetValue = () => useContext(DispatchContext)

  const Provider = ({ children }: React.PropsWithChildren) => {
    const [value, setValue] = useState(initialState)

    return (
      <StateContext.Provider value={value}>
        <DispatchContext.Provider value={setValue}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  }

  Provider.displayName = displayName

  return [
    Provider,
    useValue,
    useSetValue,
    StateContext,
  ] as const
}
