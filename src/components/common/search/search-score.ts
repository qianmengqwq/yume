import type { SearchIndexEntry } from '#site/search-index'

import { SEARCH_FIELD_WEIGHTS } from '@/constants/search'

export type SearchToken = string

export function tokenizeQuery(query: string): SearchToken[] {
  return Array.from(
    new Set(
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    ),
  )
}

export function calculateEntryScore(entry: SearchIndexEntry, tokens: SearchToken[]): number {
  let score = 0

  for (const token of tokens) {
    if (entry.haystack.title.includes(token))
      score += SEARCH_FIELD_WEIGHTS.title
    if (entry.haystack.tags.includes(token))
      score += SEARCH_FIELD_WEIGHTS.tags
    if (entry.haystack.description.includes(token))
      score += SEARCH_FIELD_WEIGHTS.description
    if (entry.haystack.slug.includes(token))
      score += SEARCH_FIELD_WEIGHTS.slug
  }

  return score
}

export function isQueryEmpty(tokens: SearchToken[]): boolean {
  return tokens.length === 0
}

export { SEARCH_FIELD_WEIGHTS }
