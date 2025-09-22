'use client'

import type { ReactNode } from 'react'
import type { ButtonSize, ButtonVariant } from './button'
import { Button } from './button'

const VARIANT_LIST: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'link']
const SIZE_LIST: ButtonSize[] = ['sm', 'md', 'lg', 'icon']

function DemoSection({ title, description, children }: { title: string, description: string, children: ReactNode }) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold text-text">{title}</h3>
        <p className="text-xs text-text-tertiary">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </section>
  )
}

export function ButtonDemo() {
  return (
    <div className="space-y-6 p-6">
      <DemoSection
        title="Variants"
        description="展示不同设计语义的按钮样式。"
      >
        {VARIANT_LIST.map(variant => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="符合圆润风格的大圆角，覆盖文本与图标尺寸。"
      >
        {SIZE_LIST.map(size => (
          <Button key={size} size={size} variant={size === 'icon' ? 'secondary' : 'primary'}>
            {size === 'icon' ? <span aria-hidden="true" className="i-mingcute-heart-line text-xl" /> : `${size} 按钮`}
          </Button>
        ))}
      </DemoSection>

      <DemoSection
        title="States"
        description="包含加载、禁用等交互状态，用来验证视觉和动画细节。"
      >
        <Button loading>加载中</Button>
        <Button disabled variant="secondary">
          已禁用
        </Button>
        <Button variant="ghost" className="shadow-none">
          悬浮态体验
        </Button>
      </DemoSection>

      <DemoSection
        title="asChild 组合"
        description="通过 asChild 复用外部组件，保持交互一致。"
      >
        <Button asChild variant="outline">
          <a href="#" className="inline-flex items-center gap-2">
            <span className="i-mingcute-link-line" aria-hidden="true" />
            链接样式
          </a>
        </Button>
        <Button asChild variant="primary">
          <span role="button" tabIndex={0} className="inline-flex items-center gap-2">
            <span className="i-mingcute-sparkles-line" aria-hidden="true" />
            自定义元素
          </span>
        </Button>
      </DemoSection>

      <DemoSection
        title="Full width"
        description="用于表单主按钮的全宽展示。"
      >
        <Button fullWidth>
          提交表单
        </Button>
      </DemoSection>
    </div>
  )
}

export function ButtonPlayground() {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background px-4 py-3">
      <p className="text-xs text-text-tertiary">组合多种属性验证焦点态与动画表现：</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="lg" loading>
          Loading CTA
        </Button>
        <Button variant="outline" size="sm" className="uppercase tracking-wide">
          Outline small
        </Button>
        <Button variant="ghost" size="md" fullWidth={false}>
          Ghost action
        </Button>
      </div>
    </div>
  )
}

export default ButtonDemo
