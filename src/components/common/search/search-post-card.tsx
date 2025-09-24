import type { SearchIndexEntry } from '#site/search-index'

import Link from 'next/link'

import { Tag } from '@/app/blog/components/tag'
import { NormalTime } from '@/components/ui/time'
import { getTagMap } from '@/data/tag'
import { cn } from '@/lib/utils'

const TAG_MAP = getTagMap()

interface SearchPostCardProps {
  entry: SearchIndexEntry
  active?: boolean
  onHover?: () => void
  onFocus?: () => void
  onSelect?: (entry: SearchIndexEntry) => void
  ref?: (node: HTMLAnchorElement | null) => void
}

export function SearchPostCard({
  entry,
  active = false,
  onHover,
  onFocus,
  onSelect,
  ref,
}: SearchPostCardProps) {
  const stateClass = active
    ? 'border-primary bg-primary/5'
    : 'border-border/60 hover:border-border hover:bg-background-secondary/70'

  return (
    <Link
      ref={ref}
      href={entry.href}
      className={cn(
        'flex flex-col gap-2 rounded-xl border p-3 transition-colors duration-150',
        stateClass,
      )}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onClick={(event) => {
        event.preventDefault()
        onSelect?.(entry)
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-text">
          {entry.title}
        </h3>
        {entry.createdAt && (
          <NormalTime
            date={entry.createdAt}
            className="text-sm text-text-tertiary"
          />
        )}
      </div>
      {entry.description && (
        <p className="text-sm leading-relaxed text-text-secondary">
          {entry.description}
        </p>
      )}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map(tag => (
            <Tag
              key={tag}
              className="border-transparent bg-background-secondary px-2 py-0.5 text-xs text-text-tertiary"
            >
              {`#${TAG_MAP[tag]?.title ?? tag}`}
            </Tag>
          ))}
        </div>
      )}
    </Link>
  )
}

export default SearchPostCard
