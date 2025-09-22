'use client'

import type { ButtonHTMLAttributes, RefObject } from 'react'
import { withAsChild } from '@/components/hoc/as-child'
import { cn } from '@/lib/utils'

const buttonVariantClasses = {
  primary:
    'bg-gradient-to-b from-primary to-primary/85 text-white hover:from-primary/95 hover:to-primary/80 active:from-primary/90 active:to-primary/75',
  secondary:
   'bg-gradient-to-b from-secondary to-secondary/85 text-white hover:from-secondary/95 hover:to-secondary/80 active:from-secondary/90 active:to-secondary/75',
  outline:
    'border-border bg-transparent text-text hover:bg-background-secondary/60 active:bg-background-secondary/80',
  ghost:
    'border-transparent bg-transparent text-text hover:bg-background-secondary/60 active:bg-background-secondary/80',
  link:
    'rounded-none border-0 p-0 h-auto gap-1 text-link underline-offset-4 hover:underline focus-visible:outline-none',
} as const

const buttonSizeClasses = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'size-11 p-0',
} as const

const linkSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  icon: 'text-base',
} as const

export type ButtonVariant = keyof typeof buttonVariantClasses
export type ButtonSize = keyof typeof buttonSizeClasses

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  ref?: RefObject<HTMLButtonElement>
}

function ButtonBase({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled: disabledProp,
  type = 'button',
  ref,
  ...rest
}: ButtonBaseProps) {
  const disabled = disabledProp ?? false
  const isDisabled = disabled || loading
  const sizeClass = variant === 'link'
    ? linkSizeClasses[size] ?? linkSizeClasses.md
    : buttonSizeClasses[size] ?? buttonSizeClasses.md

  return (
    <button
      ref={ref}
      type={type}
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      className={cn(
        'relative inline-flex select-none items-center justify-center gap-2 rounded-full border font-medium transition-all duration-200  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-60',
        buttonVariantClasses[variant],
        sizeClass,
        fullWidth && variant !== 'link' && 'w-full',
        className,
      )}
    >
      {loading && (
        <span aria-hidden="true" className="i-mingcute-loading-3-line animate-spin text-lg" />
      )}
      {children}
    </button>
  )
}

ButtonBase.displayName = 'Button'

export const Button = withAsChild<ButtonBaseProps>(ButtonBase, {
  handlerProps: ['onClick', 'onPointerDown', 'onPointerUp'],
})

export type ButtonProps = Parameters<typeof Button>[0]
