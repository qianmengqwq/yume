import type { UserConfig } from 'velite'
import rehypeShiki from '@shikijs/rehype'
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
        }),
    },
  },
  mdx: {
    rehypePlugins: [[rehypeShiki, rehypeShikiOption]],
  },
}

export default defineConfig(config)
