'use client'

import { useSearchHotkeys } from '@/atoms/hooks/use-search-hotkey'
import { isComposingAtom, meiliSearchModalAtom } from '@/atoms/meilisearch'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useAtom } from 'jotai'
import { Inbox } from 'lucide-react'
import { MeiliSearch } from 'meilisearch'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { useDebounceValue } from 'usehooks-ts'
import { LoadingIcon } from '../../loading/loading-icon'

const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: 'aSampleMasterKey',
})

async function fetcher(query: string) {
  if (!query.trim())
    return []
  const results = await client.index('movies').search(query)
  return results.hits
}

export function SearchModal() {
  const [open, setOpen] = useAtom(meiliSearchModalAtom)
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounceValue(query, 300)
  const [isComposing, setIsComposing] = useAtom(isComposingAtom)
  const router = useRouter()

  const onOpenChange = useCallback((open: boolean) => {
    if (!open && isComposing) {
      return
    }
    setOpen(open)
  }, [setOpen, isComposing])

  const onValueChange = (search: string) => {
    setKeyword(search)
    if (!isComposing) {
      setQuery(search)
    }
  }

  useSearchHotkeys()

  const { data: hits, error, isLoading } = useSWR(
    (!isComposing && debouncedQuery.trim()) ? `/api/search?q=${debouncedQuery}` : null,
    () => fetcher(debouncedQuery),
    {
      revalidateOnFocus: false,
      // 在指定的时间间隔内（以毫秒为单位），相同的请求只会执行一次
      dedupingInterval: 3000,
    },
  )

  return (
    // 一定需要取消掉filter才可以让异步的数据显示出来
    // https://github.com/pacocoursey/cmdk/issues/267
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false} loop>
      <CommandInput
        placeholder="搜索文章"
        value={keyword}
        onValueChange={onValueChange}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => {
          setIsComposing(false)
          setQuery(e.currentTarget.value)
        }}
      />

      <CommandList>

        <style jsx global>
          {`
           div[cmdk-list-sizer] {
            min-height: 300px;
            position: relative; 
            }`}
        </style>

        {error && (
          <div className="p-4 text-destructive absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            报错了😭
            {' '}
            <br />
            {error.message}
          </div>
        )}

        {isLoading && <LoadingIcon className="size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}

        {(((hits?.length === 0 || !hits) && !isLoading && !error)) && (
          <CommandEmpty className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Inbox className="size-8" />
          </CommandEmpty>
        )}

        <CommandGroup>
          {hits?.map(hit => (
            <CommandItem
              key={hit.id}
              value={hit.id}
              onSelect={() => {
                router.push(`/posts/${hit.id}`)
                setOpen(false)
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{hit.title}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
