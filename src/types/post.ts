export interface Post {
  metadata: IPostMetaData
  slug: string
  content: string
}

export interface IPostMetaData {
  title: string
  category: string
  publishedAt: string
  published?: boolean
  tags?: string[]
  summary?: string
}

export interface ITag {
  name: string
  count: number
}
