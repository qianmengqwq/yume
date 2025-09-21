'use client'

import type { ModalProps, ModalStackOptions } from './types'
import { useCallback, useContext, useId, useRef } from 'react'

import { useSetModalStack } from '@/providers/modal-provider'

import { CurrentModalContext } from './modal'

// 命令式控制弹窗栈
export function useModalStack(options?: ModalStackOptions) {
  const id = useId()
  const currentCount = useRef(0)
  const { wrapper } = options || {}
  const setModalStack = useSetModalStack()

  const present = useCallback((props: ModalProps & { id?: string }) => {
    const fallbackModelId = `${id}-${++currentCount.current}`
    const modalId = props.id ?? fallbackModelId

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
        id: props.id ?? modalId,
        wrapper,
      }

      return currentStack.concat(modalProps)
    })

    return () => {
      setModalStack(stack => stack.filter(item => item.id !== modalId))
    }
  }, [id, setModalStack, wrapper])

  const dismiss = useCallback((targetId: string) => {
    setModalStack(stack => stack.filter(item => item.id !== targetId))
  }, [setModalStack])

  const dismissTop = useCallback(() => {
    setModalStack(stack => stack.slice(0, -1))
  }, [setModalStack])

  const dismissAll = useCallback(() => {
    setModalStack([])
  }, [setModalStack])

  return {
    present,
    dismiss,
    dismissTop,
    dismissAll,
  }
}

// 在已经渲染的弹窗内获取当前弹窗的信息
export function useCurrentModal() {
  return useContext(CurrentModalContext)
}
