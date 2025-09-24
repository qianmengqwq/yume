'use client'

import type { SearchIndexEntry } from '#site/search-index'
import type { ModalContentPropsInternal } from '@/components/ui/modal/types'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Input from '@/components/ui/input/input'
import { SEARCH_MAX_RESULTS } from '@/constants/search'
import { getPostIndex } from '@/data'
import { SearchPostCard } from './search-post-card'
import { calculateEntryScore, tokenizeQuery } from './search-score'
import { useSearchNavigation } from './use-search-navigation'

const SEARCH_INDEX = getPostIndex()

function searchEntries(query: string): SearchIndexEntry[] {
  const tokens = tokenizeQuery(query)
  if (tokens.length === 0)
    return []

  const scored: Array<{ entry: SearchIndexEntry, score: number }> = []

  for (const entry of SEARCH_INDEX) {
    const score = calculateEntryScore(entry, tokens)
    if (score > 0)
      scored.push({ entry, score })
  }

  scored.sort((a, b) => {
    if (b.score !== a.score)
      return b.score - a.score
    return b.entry.timestamp - a.entry.timestamp
  })

  return scored.slice(0, SEARCH_MAX_RESULTS).map(item => item.entry)
}

export function SearchModal({ dismiss }: ModalContentPropsInternal) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

  const results = useMemo(() => searchEntries(query), [query])
  const hasResults = results.length > 0

  const handleSelect = useCallback((entry: SearchIndexEntry) => {
    dismiss()
    router.push(entry.href)
  }, [dismiss, router])

  const {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
  } = useSearchNavigation({ results, onSelect: handleSelect })

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    itemRefs.current = []
  }, [results])

  useEffect(() => {
    const node = itemRefs.current[activeIndex]
    if (node)
      node.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-xl border border-border px-3 py-2 shadow-inner text-placeholder-text focus-within:border-primary">
        <label
          htmlFor="search-modal-input"
          className="flex items-center gap-2 text-sm"
        >
          <span aria-hidden className="i-mingcute-search-3-line text-lg" />
          <Input
            ref={inputRef}
            id="search-modal-input"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索文章、描述或标签"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {hasResults && (
          <ul className="space-y-2 pr-1">
            {results.map((entry, index) => (
              <li key={entry.slug}>
                <SearchPostCard
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  entry={entry}
                  active={index === activeIndex}
                  onHover={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onSelect={handleSelect}
                />
              </li>
            ))}
          </ul>
        )}

        { query && !hasResults && (
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
            <span aria-hidden className="i-mingcute-empty-box-line size-12 text-text-tertiary" />
            <p className="text-sm text-text-tertiary">没有找到匹配结果，试试换个关键词？</p>
          </div>
        )}
      </div>
    </div>
  )
}
