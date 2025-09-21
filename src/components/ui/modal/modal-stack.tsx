import { AnimatePresence } from 'framer-motion'
import { memo } from 'react'
import { MODAL_STACK_Z_INDEX } from '@/constants/numbers'
import { useModalStackInternal } from '@/providers/modal-provider'
import { Modal } from './modal'
import { ModalOverlay } from './overlay'

export const ModalStack = memo(() => {
  const stack = useModalStackInternal()

  // 统一判断是否需要强制展示遮罩层
  // 保障需要遮罩的弹窗被满足，同时不给不需要遮罩的弹窗硬塞遮罩
  const forceOverlay = stack.some(item => item.overlay)

  return (
    <AnimatePresence mode="popLayout">
      {stack.map((item, index) => {
        return (
          <Modal
            isTop={index === stack.length - 1}
            key={item.id}
            item={item}
            index={index}
          />
        )
      })}
      {stack.length > 0 && forceOverlay && (
        <ModalOverlay zIndex={MODAL_STACK_Z_INDEX + stack.length - 1} />
      )}
    </AnimatePresence>
  )
})
