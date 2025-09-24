import type { SearchIndexEntry } from '#site/search-index'

import searchIndex from '#site/search-index.json'

export function getPostIndex(): SearchIndexEntry[] {
  return searchIndex
}
