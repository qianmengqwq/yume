import type { Post } from '#site/content'
import { posts } from '#site/content'
import Link from 'next/link'

function formatDate(input?: string) {
  if (!input)
    return ''
  const d = new Date(input)
  if (Number.isNaN(d.getTime()))
    return ''
  return d.toISOString().slice(0, 10)
}

export default function BlogIndex() {
  const list: Post[] = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">博客</h1>
      <ul className="space-y-4">
        {list.map((post) => {
          const basename = post.slug.split('/').pop() || post.slug
          return (
            <li key={post.slug} className="border-b pb-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${basename}`}>{post.title}</Link>
              </h2>
              <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
