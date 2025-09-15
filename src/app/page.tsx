import { Tooltip } from '@/components/ui/tooltip'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Tooltip.Root className="gap-4">
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Content className="p-2 rounded w-64 mb-4" placement="top">
          This is a tooltip!
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
}
