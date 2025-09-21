'use client'

import type { FC, PropsWithChildren } from 'react'
import type { ModalStackContainerProps } from './types'
import React, { useMemo } from 'react'

import {
  ModalGlobalConfigurationsContext,
  ModalStackProvider,
} from '@/providers/modal-provider'
import { ModalStack } from './modal-stack'

// 把上下文都挂载出来
// 提供全局配置、并统一输出弹窗栈
export const ModalStackContainer: FC<
  ModalStackContainerProps & PropsWithChildren
> = (props) => {
  const { children, ...globalModalConfig } = props
  return (
    <ModalStackProvider>
      <ModalGlobalConfigurationsContext.Provider
        value={useMemo(
          () => ({
            ...globalModalConfig,
          }),
          [globalModalConfig],
        )}
      >
        {children}
        <ModalStack />
      </ModalGlobalConfigurationsContext.Provider>
    </ModalStackProvider>
  )
}
