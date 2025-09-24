import type { PropsWithCC } from '@/types/extend'
import { cn } from '@/lib/utils'

export function NormalContainer({ children, className }: PropsWithCC) {
  return <div className={cn('container max-w-7xl p-12 pb-2 mx-auto', className)}>{children}</div>
}
