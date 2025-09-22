import { getLatestPosts } from '@/data/post'
import { PostCard } from './post-card'

export function LatestPosts() {
  const posts = getLatestPosts(4)
  return (
    <div className="gap-6 max-w-xl">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
