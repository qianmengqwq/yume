import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { cn } from '@/lib/utils'
import { Dropdown } from './index'

// 先声明 Demo 再在 meta 中引用
interface DemoProps {
  mode?: 'hover' | 'toggle'
  placement?: any
  sameWidth?: boolean
}

function Demo({ mode = 'toggle', placement = 'bottom-left', sameWidth }: DemoProps) {
  return (
    <Dropdown.Root mode={mode} className="text-sm font-medium">
      <Dropdown.Trigger className={cn('px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm cursor-pointer select-none')}>菜单</Dropdown.Trigger>
      <Dropdown.Content placement={placement} sameWidth={sameWidth} className="backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80">
        <Dropdown.Item onClick={() => {}}>新建文件</Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>复制链接</Dropdown.Item>
        <Dropdown.Item inset onClick={() => {}}>移动到…</Dropdown.Item>
        <Dropdown.Item className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40" onClick={() => {}}>删除</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}

const meta = {
  title: 'UI/Dropdown',
  component: Demo,
  subcomponents: { 'Dropdown.Trigger': Dropdown.Trigger, 'Dropdown.Content': Dropdown.Content, 'Dropdown.Item': Dropdown.Item },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { mode: 'toggle' },
  argTypes: {
    mode: { control: 'radio', options: ['toggle', 'hover'] },
  },
} satisfies Meta<typeof Demo>

export default meta

// 简单包装：在 Story 中组装结构
export const Basic: StoryObj<typeof meta> = {
  name: '基础 (toggle)',
  args: { mode: 'toggle' },
  render: args => <Demo {...args} />,
}

export const HoverMode: StoryObj<typeof meta> = {
  name: 'Hover 模式',
  args: { mode: 'hover' },
  render: args => <Demo {...args} />,
}

export const Placements: StoryObj<typeof meta> = {
  name: '多位置示例',
  args: { mode: 'toggle' },
  render: () => {
    const placements = ['top', 'right', 'bottom', 'left'] as const
    return (
      <div className="flex flex-wrap gap-8 items-center justify-center max-w-[520px]">
        {placements.map(p => (
          <Demo key={p} placement={p} />
        ))}
      </div>
    )
  },
}

export const SameWidth: StoryObj<typeof meta> = {
  name: '与触发器同宽',
  args: { mode: 'toggle' },
  render: () => <Demo sameWidth />,
}
