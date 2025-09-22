import type { Post } from '#site/content'
import Image from 'next/image'
import { NormalTime } from '@/components/ui/time'
import { DEFAULT_BLOG_COVER } from '@/constants/defaults'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const cover = post.cover || DEFAULT_BLOG_COVER

  return (
    <article className="group flex gap-8 rounded-lg p-4 min-h-32 hover:cursor-pointer">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md h-30 hidden md:block">
        <Image
          src={cover}
          alt={post.title}
          fill
          className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="gap-1">
          <h3 className="text-xl font-bold leading-snug line-clamp-2">{post.title}</h3>
          <NormalTime date={post.updatedAt || post.createdAt} className="text-text-tertiary" />
        </div>
        <p className="text-text-secondary line-clamp-2">{post.description}</p>

      </div>
    </article>
  )
}
