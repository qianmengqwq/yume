import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

interface RawPost {
  slug: string
  title: string
  description?: string
  tags?: string[]
  createdAt?: string
}

export interface SearchIndexEntry {
  slug: string
  href: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  timestamp: number
  haystack: {
    title: string
    description: string
    tags: string
    slug: string
  }
}

const OUTPUT_BASENAME = 'search-index'

function toSearchEntry(post: RawPost): SearchIndexEntry {
  const createdAt = post.createdAt ?? ''
  const parsedDate = new Date(createdAt)
  const timestamp = Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime()
  const tags = post.tags ?? []
  const description = post.description ?? ''

  return {
    slug: post.slug,
    href: `/blog/${post.slug}`,
    title: post.title,
    description,
    tags,
    createdAt,
    timestamp,
    haystack: {
      title: (post.title ?? '').toLowerCase(),
      description: description.toLowerCase(),
      tags: tags.join(' ').toLowerCase(),
      slug: post.slug.toLowerCase(),
    },
  }
}

export async function generateSearchIndex() {
  const outputDir = resolve(process.cwd(), '.velite')
  const postsPath = resolve(outputDir, 'posts.json')
  const postsRaw = await readFile(postsPath, 'utf8')
  const posts = JSON.parse(postsRaw) as RawPost[]

  const entries = posts
    .map(toSearchEntry)
    .sort((a, b) => b.timestamp - a.timestamp)

  const filePath = resolve(outputDir, `${OUTPUT_BASENAME}.json`)
  await mkdir(outputDir, { recursive: true })
  await writeFile(filePath, JSON.stringify(entries, null, 2))

  const typeDefinition = `export interface SearchIndexEntry {
  slug: string
  href: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  timestamp: number
  haystack: {
    title: string
    description: string
    tags: string
    slug: string
  }
}

declare const searchIndex: SearchIndexEntry[]
export default searchIndex
` as const

  await writeFile(resolve(outputDir, `${OUTPUT_BASENAME}.d.ts`), typeDefinition)
}
