import type { SearchIndexEntry } from '#site/search-index'
import type { KeyboardEvent } from 'react'

import { useCallback, useEffect, useState } from 'react'

interface UseSearchNavigationOptions {
  results: SearchIndexEntry[]
  onSelect: (entry: SearchIndexEntry) => void
}

export function useSearchNavigation({ results, onSelect }: UseSearchNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [results])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent?.isComposing)
      return

    if (!results.length)
      return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(prev => (prev + 1) % results.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(prev => (prev - 1 + results.length) % results.length)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const target = results[activeIndex]
      if (target)
        onSelect(target)
    }
  }, [activeIndex, onSelect, results])

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
  }
}

export type UseSearchNavigationReturn = ReturnType<typeof useSearchNavigation>
