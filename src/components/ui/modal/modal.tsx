'use client'

import type { Target, Transition } from 'framer-motion'
import type { PointerEventHandler, RefObject, SyntheticEvent } from 'react'
import type { ModalContentPropsInternal, ModalProps } from './types'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, useAnimationControls, useDragControls } from 'framer-motion'

import React, {
  createContext,
  createElement,
  forwardRef,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { MODAL_STACK_Z_INDEX } from '@/constants/numbers'
import { useEventCallback } from '@/hooks/common/use-event-callback'
import { useIsUnMounted } from '@/hooks/common/use-is-unmounted'

import { stopPropagation } from '@/lib/dom'
import { cn } from '@/lib/utils'
import {
  useModalGlobalConfigurations,
  useModalStackInternal,
  useSetModalStack,
} from '@/providers/modal-provider'

const microReboundPreset: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
}

const enterStyle: Target = {
  scale: 1,
  opacity: 1,
}
const initialStyle: Target = {
  scale: 0.96,
  opacity: 0,
}

export type CurrentModalContentProps = ModalContentPropsInternal & {
  ref: RefObject<HTMLElement | null>
}

export const CurrentModalContext = createContext<CurrentModalContentProps>(
  null as any,
)

interface ModalComponentProps {
  item: ModalProps & { id: string }
  index: number
  isTop: boolean
  onClose?: (open: boolean) => void
  children?: React.ReactNode
}

export const Modal = memo(
  forwardRef<HTMLDivElement, ModalComponentProps>(
    ({ item, index, onClose: onPropsClose, children, isTop }, ref) => {
      const setStack = useSetModalStack()
      const close = useEventCallback(() => {
        setStack((p) => {
          return p.filter(modal => modal.id !== item.id)
        })
        onPropsClose?.(false)
      })
      const zIndexStyle = useMemo(
        () => ({ zIndex: MODAL_STACK_Z_INDEX + index + 1 }),
        [index],
      )

      const modalStack = useModalStackInternal()
      const currentIsClosing = modalStack.every(modal => modal.id !== item.id)

      const onClose = useCallback(
        (open: boolean): void => {
          if (!open) {
            close()
          }
        },
        [close],
      )
      const globalConfig = useModalGlobalConfigurations()

      const {
        CustomModalComponent,
        modalClassName,
        content,
        title,
        clickOutsideToDismiss,
        modalContainerClassName,
        wrapper: Wrapper = Fragment,
        max,
      } = { ...globalConfig, ...item }

      const dismiss = useCallback(
        (e: SyntheticEvent) => {
          stopPropagation(e)
          close()
        },
        [close],
      )

      const isUnmounted = useIsUnMounted()
      const animateController = useAnimationControls()
      useEffect(() => {
        requestAnimationFrame(() => {
          animateController.start(enterStyle)
        })
      }, [animateController])
      const noticeModal = useCallback(() => {
        animateController
          .start({
            scale: 1.05,
            transition: {
              duration: 0.06,
            },
          })
          .then(() => {
            if (isUnmounted.current)
              return
            animateController.start({
              scale: 1,
            })
          })
      }, [animateController])

      const modalContentRef = useRef<HTMLDivElement>(null)
      const ModalProps: ModalContentPropsInternal = useMemo(
        () => ({
          dismiss: close,
        }),
        [close],
      )

      const ModalContextProps = useMemo<CurrentModalContentProps>(
        () => ({
          ...ModalProps,
          ref: modalContentRef,
        }),
        [ModalProps],
      )
      const finalChildren = (
        <>{children || createElement(content, ModalProps)}</>
      )

      const isSelectingRef = useRef(false)
      const handleSelectStart = useCallback(() => {
        isSelectingRef.current = true
      }, [])
      const handleDetectSelectEnd = useCallback(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (isSelectingRef.current) {
              isSelectingRef.current = false
            }
          })
        })
      }, [])

      const handleClickOutsideToDismiss = useCallback(
        (e: SyntheticEvent) => {
          if (isSelectingRef.current)
            return
          const fn = clickOutsideToDismiss ? dismiss : noticeModal
          fn?.(e)
        },
        [clickOutsideToDismiss, dismiss, noticeModal],
      )

      useEffect(() => {
        if (currentIsClosing) {
          // Radix dialog will block pointer events
          document.body.style.pointerEvents = 'auto'
        }
      }, [currentIsClosing])

      const edgeElementRef = useRef<HTMLDivElement>(null)

      const dragController = useDragControls()
      const handleDrag: PointerEventHandler<HTMLDivElement> = useCallback(
        (e) => {
          dragController.start(e)
        },
        [dragController],
      )

      useEffect(() => {
        if (isTop)
          return
        animateController.start({
          scale: 0.96,
          y: 10,
        })
        return () => {
          animateController.stop()
          animateController.start({
            scale: 1,
            y: 0,
          })
        }
      }, [animateController, isTop])

      if (CustomModalComponent) {
        return (
          <Wrapper>
            <Dialog.Root open onOpenChange={onClose}>
              <Dialog.Portal>
                <Dialog.Title className="sr-only">{title}</Dialog.Title>
                <Dialog.Content asChild>
                  <div
                    ref={ref}
                    className={cn(
                      'fixed inset-0 z-[20] overflow-auto',
                      currentIsClosing && 'pointer-events-none',
                      modalContainerClassName,
                    )}
                    onClick={handleClickOutsideToDismiss}
                    onPointerUp={handleDetectSelectEnd}
                  >
                    <div
                      className="contents"
                      onClick={stopPropagation}
                      onSelect={handleSelectStart}
                      onKeyUp={handleSelectStart}
                    >
                      <CurrentModalContext.Provider value={ModalContextProps}>
                        <CustomModalComponent>
                          {finalChildren}
                        </CustomModalComponent>
                      </CurrentModalContext.Provider>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Wrapper>
        )
      }
      return (
        <Wrapper>
          <Dialog.Root open onOpenChange={onClose}>
            <Dialog.Portal>
              <Dialog.Content
                asChild
                className={cn(
                  'fixed inset-0 flex items-center justify-center',
                  currentIsClosing && 'pointer-events-none',
                  modalContainerClassName,
                )}
                onClick={handleClickOutsideToDismiss}
                onPointerUp={handleDetectSelectEnd}
                style={zIndexStyle}
              >
                <div ref={edgeElementRef} className="flex h-full w-full items-center justify-center">
                  <motion.div
                    ref={ref}
                    style={zIndexStyle}
                    exit={initialStyle}
                    initial={initialStyle}
                    animate={animateController}
                    transition={microReboundPreset}
                    className={cn(
                      'relative flex flex-col overflow-hidden rounded-3xl',
                      'bg-background',
                      'p-2 shadow-2xl shadow-gray/50 backdrop-blur-sm',
                      max
                        ? 'h-[80vh] w-[80vw]'
                        : 'max-h-[70vh] min-w-[300px] max-w-[90vw] lg:max-h-[calc(100vh-20rem)] lg:max-w-[70vw]',

                      'border border-border/50',
                      modalClassName,
                    )}
                    onClick={stopPropagation}
                    onSelect={handleSelectStart}
                    onKeyUp={handleSelectStart}
                    drag
                    dragControls={dragController}
                    dragElastic={0}
                    dragListener={false}
                    dragMomentum={false}
                    dragConstraints={edgeElementRef}
                    whileDrag={{
                      cursor: 'grabbing',
                    }}
                  >
                    <div
                      className="relative flex items-center"
                      onPointerDownCapture={handleDrag}
                    >
                      <Dialog.Title className="flex shrink-0 grow items-center gap-2 px-4 py-1 text-lg font-semibold">
                        <span>{title}</span>
                      </Dialog.Title>
                      <Dialog.Close
                        onClick={close}
                        className="absolute right-0 top-0 z-[9] p-2"
                      >
                        <span aria-hidden className="inline-block text-xl leading-none">
                          ×
                        </span>
                        <span className="sr-only">Close</span>
                      </Dialog.Close>
                    </div>
                    {/* 防止默认铺满倒置的border消失 */}
                    <div className="my-2 p-1 flex-shrink-0 border-t border-slate-200 dark:border-neutral-800" />

                    <div
                      className="min-h-0 flex-shrink flex-grow overflow-auto px-4 py-2"
                    >
                      <CurrentModalContext.Provider value={ModalContextProps}>
                        {finalChildren}
                      </CurrentModalContext.Provider>
                    </div>
                  </motion.div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Wrapper>
      )
    },
  ),
)
