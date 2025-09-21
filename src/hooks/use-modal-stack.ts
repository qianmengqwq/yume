'use client'

import type { ModalProps, ModalStackOptions } from '@/types/ui/modal'

import { useCallback, useId, useRef } from 'react'
import { useSetModalStack } from '@/providers/modal-provider'

export function useModalStack(options?: ModalStackOptions) {
  const id = useId()
  const counterRef = useRef(0)
  const { wrapper } = options || {}
  const setModalStack = useSetModalStack()

  return {
    present: useCallback(
      (props: ModalProps & { id?: string }) => {
        const generatedId = `${id}-${++counterRef.current}`
        const modalId = props.id ?? generatedId

        setModalStack((currentStack) => {
          const existingModal = currentStack.find(item => item.id === modalId)

          if (existingModal) {
            const index = currentStack.indexOf(existingModal)
            return [
              ...currentStack.slice(0, index),
              ...currentStack.slice(index + 1),
              existingModal,
            ]
          }

          const modalProps = {
            ...props,
            id: modalId,
            wrapper,
          }

          return currentStack.concat(modalProps)
        })

        return () => {
          setModalStack(stack => stack.filter(item => item.id !== modalId))
        }
      },
      [id, setModalStack, wrapper],
    ),
    dismiss: useCallback(
      (targetId: string) => {
        setModalStack(stack => stack.filter(item => item.id !== targetId))
      },
      [setModalStack],
    ),
    dismissTop: useCallback(() => {
      setModalStack(stack => stack.slice(0, -1))
    }, [setModalStack]),
    dismissAll: useCallback(() => {
      setModalStack([])
    }, [setModalStack]),
  }
}
