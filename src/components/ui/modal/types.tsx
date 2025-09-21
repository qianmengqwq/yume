import type { FC, PropsWithChildren } from 'react'

export interface ModalProps {
  title: string
  CustomModalComponent?: FC<PropsWithChildren>
  content: FC<ModalContentPropsInternal>
  clickOutsideToDismiss?: boolean
  modalClassName?: string
  modalContainerClassName?: string
  max?: boolean
  wrapper?: FC
  overlay?: boolean
}
export interface ModalStackOptions {
  wrapper?: FC
}

export interface ModalStackContainerProps
  extends Omit<
    ModalProps,
    'title' | 'content' | 'CustomModalComponent' | 'max'
  > {}

export type ModalContentComponent<T> = FC<ModalContentPropsInternal & T>
export interface ModalContentPropsInternal {
  dismiss: () => void
}
