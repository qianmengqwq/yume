import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { cn } from '@/lib/utils'
import { Tooltip } from './index'

interface DemoProps {
  placement?: any
  text?: string
  anchorsVisible?: 'no-overflow' | 'anchors-visible'
  duration?: number
  offset?: { x?: number, y?: number }
}

function Demo({ placement = 'bottom', text = '提示内容', anchorsVisible, duration, offset }: DemoProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger className={cn('inline-flex px-2.5 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm cursor-default')}>{placement}</Tooltip.Trigger>
      <Tooltip.Content placement={placement} anchorsVisible={anchorsVisible} duration={duration} offset={offset} className="px-2 py-1 text-xs shadow-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black">
        {text}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

const meta = {
  title: 'UI/Tooltip',
  component: Demo,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { placement: 'bottom', text: '提示内容' },
  argTypes: {
    placement: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    anchorsVisible: { control: 'radio', options: ['no-overflow', 'anchors-visible'] },
  },
} satisfies Meta<typeof Demo>

export default meta

export const Basic: StoryObj<typeof meta> = {
  name: '基础',
  render: args => <Demo {...args} />,
}

export const Placements: StoryObj<typeof meta> = {
  name: '多位置',
  render: () => (
    <div className="flex flex-wrap gap-6 items-center justify-center max-w-[520px]">
      {['top', 'right', 'bottom', 'left'].map(p => (
        <Demo key={p} placement={p} text={`在 ${p} 的 tooltip`} />
      ))}
    </div>
  ),
}

export const WithDelay: StoryObj<typeof meta> = {
  name: '自定义动画时长',
  render: () => <Demo duration={400} text="动画 400ms" />,
}

export const Offset: StoryObj<typeof meta> = {
  name: '偏移演示',
  render: () => <Demo offset={{ x: 12, y: -4 }} text="x:12 y:-4" />,
}
