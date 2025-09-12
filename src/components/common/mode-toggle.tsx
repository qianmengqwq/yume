'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

// 主题切换：light/dark/system
// 使用 mingcute 图标类名，配合 tailwind 过渡动画
export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 避免 SSR 与客户端不一致闪烁
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex size-9 items-center justify-center rounded-md border border-transparent text-zinc-600 dark:text-zinc-300"
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
      className="group relative inline-flex size-9 select-none items-center justify-center overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
    >
      <span
        className={`transition-transform duration-300 ease-out ${active.icon} text-xl`}
      />
      <span className="pointer-events-none absolute -bottom-6 translate-y-2 opacity-0 rounded bg-zinc-800 px-2 py-0.5 text-xs text-white shadow-md transition group-hover:translate-y-0 group-hover:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
        {active.label}
      </span>
    </button>
  )
}

export default ModeToggle
