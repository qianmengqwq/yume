import type { ComponentType, ReactElement, ReactNode } from 'react'
import { cloneElement, createElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'

interface WithAsChildOptions<P> {
  handlerProps?: (keyof P & string)[]
}

type EventLike = { defaultPrevented?: boolean } | undefined

function isDefaultPrevented(value: unknown): boolean {
  if (!value || typeof value !== 'object')
    return false
  return Boolean((value as EventLike)?.defaultPrevented)
}

function call(handler: unknown, args: unknown[]) {
  if (typeof handler === 'function')
    (handler as (...inner: unknown[]) => void)(...args)
}

export function withAsChild<P extends { children?: ReactNode, className?: string }>(
  Component: ComponentType<P>,
  { handlerProps = [] }: WithAsChildOptions<P> = {},
) {
  type PropsWithAsChild = P & { asChild?: boolean }

  function ComponentWithAsChild(props: PropsWithAsChild) {
    const { asChild, children, ...rest } = props
    const baseElement = createElement(Component, { ...(rest as P), children })

    if (!asChild || !isValidElement(children))
      return baseElement

    const childElement = children as ReactElement<{ className?: string }>
    const { children: _ignored, ...baseProps } = baseElement.props as Record<string, unknown>
    const mergedProps: Record<string, unknown> = { ...childElement.props, ...baseProps }

    if ('className' in childElement.props || 'className' in baseProps) {
      const childClass = childElement.props.className as string | undefined
      const baseClass = baseProps.className as string | undefined
      mergedProps.className = cn(childClass, baseClass)
    }

    handlerProps.forEach((key) => {
      const childHandler = childElement.props[key as keyof typeof childElement.props]
      const baseHandler = baseProps[key]

      if (typeof childHandler !== 'function' && typeof baseHandler !== 'function')
        return

      mergedProps[key] = (...args: unknown[]) => {
        call(childHandler, args)
        if (!isDefaultPrevented(args[0]))
          call(baseHandler, args)
      }
    })

    return cloneElement(childElement, mergedProps)
  }

  ComponentWithAsChild.displayName = Component.displayName ?? Component.name ?? 'ComponentWithAsChild'

  return ComponentWithAsChild
}
