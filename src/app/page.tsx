import { Test } from '@/components/common/test'
import { Dropdown } from '@/components/ui/dropdown'
import { Tooltip } from '@/components/ui/tooltip'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[300vh] gap-12 py-12">
      {/* Tooltip demo */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-medium">Tooltip (hover)</h2>
        <Tooltip.Root className="gap-4">
          <Tooltip.Trigger>
            <span className="px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800">Hover me</span>
          </Tooltip.Trigger>
          <Tooltip.Content className="p-2 rounded" placement="top" offset={{ y: -8 }}>
            This is a tooltip!
          </Tooltip.Content>
        </Tooltip.Root>
      </div>

      {/* Dropdown demos */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-xl font-medium">Dropdown (toggle & hover)</h2>
        <div className="flex items-start gap-8">
          {/* Toggle mode */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-neutral-500">mode = "toggle"</span>
            <Dropdown.Root mode="toggle" asChild>
              <Dropdown.Trigger className="px-4 py-2 rounded border border-border">
                Open menu
                <span aria-hidden className="">▾</span>
              </Dropdown.Trigger>
              <Dropdown.Content className="mt-1" placement="bottom-left" sameWidth>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Log out</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>

          {/* Hover mode */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-neutral-500">mode = "hover"</span>
            <Dropdown.Root mode="toggle">
              <Dropdown.Trigger className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                Hover menu
                <span aria-hidden>▾</span>
              </Dropdown.Trigger>
              <Dropdown.Content className="mt-1" placement="bottom-left" sameWidth>
                <Dropdown.Item>New file</Dropdown.Item>
                <Dropdown.Item>Duplicate</Dropdown.Item>
                <Dropdown.SubRoot>
                  <Dropdown.SubTrigger>
                    <span>more</span>
                  </Dropdown.SubTrigger>
                  <Dropdown.Content placement="right-top" sameWidth>
                    <Dropdown.Item>Rename</Dropdown.Item>
                    <Dropdown.Item>Archive</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.SubRoot>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>
        </div>
      </div>
      <Test />
    </div>
  )
}
