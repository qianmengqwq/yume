import type { Collection, UserConfig } from 'velite'
import type { TocEntry } from '@/types/toc'
import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { defineConfig, s } from 'velite'
import { rehypeAutolinkHeadingsOptions } from '@/config/rehype-autolink-headings'
import { rehypeShikiOption } from '@/config/rehype-shiki'
import { flatten } from '@/types/toc/transform'

function computedFields<T extends { tocEntry: TocEntry }>(data: T) {
  return {
    ...data,
    tocFlatten: flatten(data.tocEntry),
  }
}

const posts = {
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('post'),
      createdAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      tags: s.array(s.string()).max(10).default([]),
      metadata: s.metadata(),
      cover: s.image().optional(),
      code: s.mdx(),
      tocEntry: s.toc(),
    })
    .transform(computedFields),
} satisfies Collection

const config = {
  collections: {
    posts,
  },
  mdx: {
    rehypePlugins: [
      [rehypeShiki, rehypeShikiOption],
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    ],
  },
} satisfies UserConfig

export default defineConfig(config)
