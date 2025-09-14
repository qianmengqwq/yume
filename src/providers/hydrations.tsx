'use client'

import { useEffect } from 'react'
import { registerCopyButton, unregisterCopyButton } from '@/components/mdx/shiki-transformers/copy-button'

export function Hydrations() {
  useEffect(() => {
    registerCopyButton()
    return () => {
      unregisterCopyButton()
    }
  }, [])
  return null
}
