import type { IPostMetaData } from '@/types/post'
import { PostDynamicMetadata } from '../module/post/post-dynamic-metadata'

interface PostHeaderProps {
  metadata: IPostMetaData
}

export function PostHeader({ metadata }: PostHeaderProps) {
  return (
    <div className="flex-center flex-col text-center">
      <h1 className="text-2xl font-extrabold tracking-tight xl:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
        {metadata.title}
      </h1>

      <div className="text-muted-foreground flex-center gap-3 mb-2">
        <span>
          发布于
          {' '}
          {metadata.createdAt}
        </span>
        { metadata?.updatedAt && (
          <span>
            更新于
            {' '}
            {metadata.updatedAt}
          </span>
        )}
        <PostDynamicMetadata metadata={metadata} />
      </div>

      <div className="text-muted-foreground bg-muted max-w-2xl mx-auto p-4 leading-relaxed border-l-4 border-primary/90 rounded-xl">
        {metadata.description}
      </div>
    </div>
  )
}
