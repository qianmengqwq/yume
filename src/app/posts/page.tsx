import { getAllPosts } from '@/components/mdx/utils'
import { PostList } from '@/components/module/post/post-list'

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mt-10 grid grid-cols-1">
      <PostList posts={posts} />
    </div>
  )
}
