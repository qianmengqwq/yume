import type { RefObject } from 'react'
import { motion } from 'framer-motion'

import { RootPortal } from '@/components/primitive/portal'

export function ModalOverlay(
  { zIndex, ref }: { zIndex?: number, ref?: RefObject<HTMLDivElement> },
) {
  return (
    <RootPortal>
      <motion.div
        ref={ref}
        id="modal-overlay"
        className="pointer-events-none fixed inset-0 z-[11] bg-zinc-50/80 dark:bg-neutral-900/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        style={{ zIndex }}
      />
    </RootPortal>
  )
}
