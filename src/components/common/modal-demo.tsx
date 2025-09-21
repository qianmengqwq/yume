'use client'

import type { ModalContentPropsInternal } from '@/components/ui/modal/types'

import { useCallback, useState } from 'react'
import { ModalStackContainer } from '@/components/ui/modal/container'
import { DeclarativeModal } from '@/components/ui/modal/declarative-modal'
import { useModalStack } from '@/hooks/use-modal-stack'

function ChildModalContent({ dismiss }: ModalContentPropsInternal) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        这是子弹窗，用来演示在父弹窗中再打开一个弹窗的嵌套场景。
      </p>
      <div className="flex justify-end gap-2">
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={dismiss}
        >
          关闭子弹窗
        </button>
      </div>
    </div>
  )
}

function ParentModalContent({ dismiss }: ModalContentPropsInternal) {
  const { present } = useModalStack()

  const handleOpenChild = useCallback(() => {
    present({
      title: '嵌套子弹窗',
      content: ChildModalContent,
      overlay: true,
    })
  }, [present])

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        父弹窗内部提供一个按钮，用来打开另一个子弹窗，测试嵌套能力。
      </p>
      <div className="flex justify-end gap-2">
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={handleOpenChild}
        >
          打开子弹窗
        </button>
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={dismiss}
        >
          关闭父弹窗
        </button>
      </div>
    </div>
  )
}

function MaxModalContent({ dismiss }: ModalContentPropsInternal) {
  return (
    <div className="flex h-full flex-col gap-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        这个弹窗开启了 max 属性，模拟接近全屏的展示效果。
      </p>
      <div className="mt-auto flex justify-end gap-2">
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={dismiss}
        >
          关闭
        </button>
      </div>
    </div>
  )
}

function ModalDemoContent() {
  const [declarativeOpen, setDeclarativeOpen] = useState(false)
  const { present } = useModalStack()

  const handleOpenNested = useCallback(() => {
    present({
      title: '父弹窗',
      content: ParentModalContent,
      overlay: true,
    })
  }, [present])

  const handleOpenMax = useCallback(() => {
    present({
      title: 'Max 弹窗',
      content: MaxModalContent,
      overlay: true,
      max: true,
    })
  }, [present])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={handleOpenNested}
        >
          打开嵌套弹窗
        </button>
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={handleOpenMax}
        >
          打开 Max 弹窗
        </button>
        <button
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={() => setDeclarativeOpen(true)}
        >
          打开声明式弹窗
        </button>
      </div>

      <DeclarativeModal
        title="声明式弹窗"
        open={declarativeOpen}
        onOpenChange={setDeclarativeOpen}
        overlay
        clickOutsideToDismiss
      >
        <div className="space-y-4 px-4 py-2">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            使用 DeclarativeModal 直接通过 open/onOpenChange 受控渲染。
          </p>
          <DeclarativeModal.FooterAction>
            <button
              className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              onClick={() => setDeclarativeOpen(false)}
            >
              确定
            </button>
          </DeclarativeModal.FooterAction>
        </div>
      </DeclarativeModal>
    </div>
  )
}

export function ModalDemo() {
  return (
    <ModalStackContainer overlay>
      <ModalDemoContent />
    </ModalStackContainer>
  )
}
