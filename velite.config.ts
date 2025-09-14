import type { UserConfig } from 'velite'
import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { defineConfig, s } from 'velite'
import { rehypeShikiOption } from '@/config/rehype-shiki'

const config: UserConfig = {
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.slug('posts'),
          createdAt: s.isodate(),
          updatedAt: s.isodate().optional(),
          metadata: s.metadata(),
          cover: s.image().optional(),
          code: s.mdx(),
          tocEntry: s.toc(),
        }),
    },
  },
  mdx: {
    rehypePlugins: [[rehypeShiki, rehypeShikiOption], rehypeSlug, rehypeAutolinkHeadings],
  },
}

export default defineConfig(config)
