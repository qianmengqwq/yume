import Image from 'next/image'
import { notFound } from 'next/navigation'
import ModeToggle from '@/components/common/mode-toggle'
import { MDXContent } from '@/components/mdx/mdx-content'
import { TocView } from '@/components/mdx/toc-view'
import { getAllPostSlugs, getPostBySlug } from '@/data/post'
import { NormalContainer } from '@/layout/container/normal'
import { getMinDepth } from '@/types/toc/transform'

export function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

interface BlogPostProps {
  params: Promise<{ slug: string }>
}
export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  if (!slug)
    return notFound()
  const post = getPostBySlug(slug)

  if (!post)
    return notFound()

  const minDepth = getMinDepth(post.tocFlatten)

  return (
    <NormalContainer>
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
      {/* 正文 + 右侧目录布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8">
        <MDXContent code={post.code} />
        <div className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          <TocView flat={post.tocFlatten} minDepth={minDepth} />
        </div>
      </div>
    </NormalContainer>
  )
}
