import type { ModalProps, ModalStackContainerProps } from '@/components/ui/modal/types'
import { createContext, useContext } from 'react'
import { createContextState } from '@/components/hoc/create-context-state'

export const [ModalStackProvider, useModalStackInternal, useSetModalStack]
  = createContextState(
    [] as (ModalProps & { id: string })[],
    'ModalStackProvider',
  )

export const ModalGlobalConfigurationsContext
  = createContext<ModalStackContainerProps>({})
export function useModalGlobalConfigurations() {
  return useContext(ModalGlobalConfigurationsContext)
}
