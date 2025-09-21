'use client'

import type { FC, ReactNode } from 'react'
import type { ModalProps } from './types'
import type { PropsWithCC } from '@/types/extend'
import { AnimatePresence } from 'framer-motion'

import React, { useId, useMemo } from 'react'
import { MODAL_STACK_Z_INDEX } from '@/constants/numbers'

import { cn } from '@/lib/utils'
import { useModalStackInternal } from '@/providers/modal-provider'
import { Modal } from './modal'
import { ModalOverlay } from './overlay'

export interface DeclarativeModalProps extends Omit<ModalProps, 'content'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  id?: string
}

const Noop = () => null
const DeclarativeModalImpl: FC<DeclarativeModalProps> = ({
  open,
  onOpenChange,
  children,
  ...rest
}) => {
  const modalStack = useModalStackInternal()
  const index = useMemo(() => modalStack.length, [])

  const id = useId()
  const item = useMemo(
    () => ({
      ...rest,
      // 已经直接把弹窗的内容作为 children 传进去，不需要 content 再渲染任何东西
      content: Noop,
      id,
    }),
    [id, rest],
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <ModalOverlay zIndex={MODAL_STACK_Z_INDEX - 10 + index} />
          <Modal onClose={onOpenChange} isTop index={index} item={item}>
            {children}
          </Modal>
        </>
      )}
    </AnimatePresence>
  )
}

function FooterAction({ children, className }: PropsWithCC) {
  return (
    <div
      className={cn('mt-4 flex items-center justify-end gap-2', className)}
    >
      {children}
    </div>
  )
}

export const DeclarativeModal = Object.assign(DeclarativeModalImpl, {
  FooterAction,
})
