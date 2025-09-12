import type { Post } from '#site/content'
import { posts } from '#site/content'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ModeToggle from '@/components/common/mode-toggle'
import { MDXContent } from '@/components/mdx/mdx-content'

function getBySlug(slug: string): Post | undefined {
  return posts.find(p => (p.slug.split('/').pop() || p.slug) === slug)
}

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug.split('/').pop() || p.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getBySlug(slug)
  if (!post)
    return notFound()

  return (
    <article className="mx-auto max-w-3xl p-6 prose">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          {post.cover?.src
            ? (
                <div className="relative w-full h-40">
                  <Image src={post.cover.src} alt={post.title} fill className="object-contain" />
                </div>
              )
            : null}
        </div>
        <div className="shrink-0">
          <ModeToggle />
        </div>
      </header>
      {/* 渲染 MDX */}
      <MDXContent code={post.code} />
    </article>
  )
}
