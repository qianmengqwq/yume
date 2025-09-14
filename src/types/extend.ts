import type { PropsWithChildren } from 'react'

export type PropsWithCC<T = unknown> = PropsWithChildren<T> & { className?: string }
