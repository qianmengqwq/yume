import Link from 'next/link'
import { getLatestPosts } from '@/data/post'
import { PostCard } from './post-card'

export function LatestPosts() {
  const posts = getLatestPosts(4)
  return (
    <div className="flex flex-col gap-2 max-w-xl bg-background-secondary/40">
      {posts.map(post => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  )
}
