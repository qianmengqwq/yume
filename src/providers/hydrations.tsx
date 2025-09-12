'use client'

import { useEffect } from 'react'
import { registerCopyButton } from '@/components/mdx/shiki-transformers/copy-button'

export function Hydrations() {
  useEffect(() => {
    registerCopyButton()
  }, [])
  return null
}
