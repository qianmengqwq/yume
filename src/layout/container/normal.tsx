import type { PropsWithCC } from '@/types/extend'
import { cn } from '@/lib/utils'

export function NormalContainer({ children, className }: PropsWithCC) {
  return <div className={cn('container max-w-7xl px-2 mt-32 mx-auto', className)}>{children}</div>
}
