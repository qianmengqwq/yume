'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'
import { useMounted } from '@/hooks/common/use-mounted'

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const mounted = useMounted()

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex size-9 items-center justify-center rounded-md"
        disabled
      >
        <span className="i-mingcute-loading-3-line animate-spin" />
      </button>
    )
  }

  const current = resolvedTheme || theme

  const order: Array<{ key: string, icon: string, label: string }> = [
    { key: 'light', icon: 'i-mingcute-sun-line', label: 'Light' },
    { key: 'dark', icon: 'i-mingcute-moon-line', label: 'Dark' },
    { key: 'system', icon: 'i-mingcute-computer-line', label: 'System' },
  ]

  function nextTheme() {
    const idx = order.findIndex(o => o.key === current)
    const next = order[(idx + 1) % order.length].key
    setTheme(next)
  }

  const active = order.find(o => o.key === current) || order[0]

  return (
    <button
      type="button"
      onClick={nextTheme}
      aria-label={`Current theme: ${active.label}. Click to switch.`}
      className="group relative inline-flex size-9 select-none items-center justify-center overflow-hidden rounded-md"
    >
      <span
        className={`transition-transform duration-300 ease-out ${active.icon} text-xl`}
      />
    </button>
  )
}

export default ModeToggle
