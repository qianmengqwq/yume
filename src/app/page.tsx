import { Intro } from './components/intro'
import { LatestPosts } from './components/latest-posts'
import { Section } from './components/section'

export default function Home() {
  return (
    <div className="flex flex-col gap-12 min-h-screen">
      <Intro />
      <Section title="Blogs" href="/blog">
        <LatestPosts />
      </Section>
    </div>
  )
}
