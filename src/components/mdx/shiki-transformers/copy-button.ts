import type { ShikiTransformer } from 'shiki'
import { cn } from '@/lib/utils'

interface CopyButtonOptions {
  feedbackDuration?: number
  visibility?: 'hover' | 'always'
}

export function transformerCopyButton(
  options: CopyButtonOptions = {
    visibility: 'hover',
    feedbackDuration: 3_000,
  },
): ShikiTransformer {
  return {
    name: 'copy-button',
    pre(node) {
      // 给 <pre> 添加 group 相对定位，便于按钮基于 tailwind group-hover 控制可见性
      node.properties = {
        ...(node.properties || {}),
        class: `${node.properties.class || ''} group relative`.trim(),
      }

      const baseBtnClass = cn(
        'rehype-shiki-copy',
        'absolute top-2 right-2 inline-flex items-center justify-center gap-1',
        'rounded-md border border-zinc-300 bg-white/95 text-zinc-700 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80',
        'dark:border-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-200 dark:shadow-sm dark:supports-[backdrop-filter]:bg-zinc-800/50',
        'px-2 py-1 text-[11px] font-medium select-none outline-none',
        'transition-all duration-200',
        // 初次出现轻微淡入缩放（当 hover 显示时在进入视图 hover 时触发）
        'data-[visibility=always]:animate-in data-[visibility=always]:fade-in data-[visibility=always]:zoom-in-95',
        'hover:bg-white dark:hover:bg-zinc-800',
        'focus-visible:ring-2 focus-visible:ring-indigo-400/70 dark:focus-visible:ring-indigo-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900',
        'active:scale-95',
        // success state colors (data attr) + scale pulse
        'data-[copied=true]:bg-emerald-500 data-[copied=true]:text-white data-[copied=true]:border-emerald-500',
        'data-[copied=true]:shadow-[0_0_0_1px_rgba(16,185,129,0.5)]',
        'data-[copied=true]:scale-105 data-[copied=true]:ring-2 data-[copied=true]:ring-emerald-400/60 data-[copied=true]:ring-offset-2 data-[copied=true]:ring-offset-white dark:data-[copied=true]:ring-offset-zinc-900',
        'data-[copied=true]:animate-in data-[copied=true]:fade-in data-[copied=true]:zoom-in-95',
        // visibility (added later)
        options.visibility === 'hover'
          ? 'opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0'
          : 'opacity-100',
      )

      node.children.push({
        type: 'element',
        tagName: 'button',
        properties: {
          'type': 'button',
          'data-code': this.source,
          'title': '复制代码',
          'aria-label': 'Copy code',
          'class': baseBtnClass,
          'data-visibility': options.visibility,
          'data-feedback-duration': options.feedbackDuration,
          'data-name': 'rehype-shiki-copy-button',
          'data-copied': 'false',
          // 水合后注入事件
          'onclick': undefined,
        },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { 'class': 'icon i-mingcute-copy-2-line size-4 transition-all duration-200', 'data-role': 'icon' },
            children: [],
          },
        ],
      })
    },
  }
}

// 水合时注入
export function registerCopyButton() {
  if (typeof document === 'undefined')
    return
  const copyButtonElements = document.querySelectorAll(
    'button[data-name="rehype-shiki-copy-button"]',
  )
  copyButtonElements.forEach((element) => {
    element.addEventListener('click', async (event) => {
      event.preventDefault()
      const target = event.currentTarget as HTMLButtonElement
      const source = target.getAttribute('data-code')
      if (!source)
        return
      // 先进行 UI 乐观更新
      const iconSpan = target.querySelector('[data-role="icon"]') as HTMLSpanElement | null
      const feedbackDuration = target.getAttribute('data-feedback-duration')

      const restore = () => {
        target.setAttribute('data-copied', 'false')
        if (iconSpan) {
          iconSpan.classList.remove('i-mingcute-check-line', 'scale-110')
          iconSpan.classList.add('i-mingcute-copy-2-line')
        }
      }
      const succeed = () => {
        if (iconSpan) {
          iconSpan.classList.remove('i-mingcute-copy-2-line')
          iconSpan.classList.add('i-mingcute-check-line', 'scale-110')
        }
        target.setAttribute('data-copied', 'true')
        setTimeout(restore, Number(feedbackDuration || 2_500))
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(source)
          succeed()
        }
        else {
          // 旧 fallback
          const ta = document.createElement('textarea')
          ta.value = source
          ta.style.position = 'fixed'
          ta.style.top = '0'
          ta.style.left = '0'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.focus()
          ta.select()
          const ok = document.execCommand('copy')
          document.body.removeChild(ta)
          if (ok)
            succeed()
          else throw new Error('execCommand copy failed')
        }
      }
      catch (err) {
        console.warn('[copy-button] copy failed', err)
        // 失败时轻微晃动反馈
        target.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-4px)' },
          { transform: 'translateX(4px)' },
          { transform: 'translateX(0)' },
        ], { duration: 300, easing: 'ease-in-out' })
      }
    })
  })
}
