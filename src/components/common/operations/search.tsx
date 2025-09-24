'use client'

import { useCallback, useEffect } from 'react'

import { SearchModal } from '@/components/common/search/search-modal'
import { useModalStack } from '@/hooks/use-modal-stack'

export function Search() {
  const { present } = useModalStack()

  const openSearch = useCallback(() => {
    present({
      id: 'global-search',
      title: '站内搜索',
      content: SearchModal,
      modalClassName: 'w-[60vw] h-[50vh]',
      clickOutsideToDismiss: true,
    })
  }, [present])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isModKey = event.metaKey || event.ctrlKey
      if (!isModKey)
        return

      if (event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => {
      window.removeEventListener('keydown', handleShortcut)
    }
  }, [openSearch])

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="打开站内搜索"
      title="搜索 (⌘K / Ctrl+K)"
      className="flex items-center justify-center"
    >
      <span aria-hidden className="i-mingcute-search-3-line text-lg" />
    </button>
  )
}

export default Search
