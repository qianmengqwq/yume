export interface TocEntry {
  title: string
  url: string
  items: TocEntry[]
}

export interface TocFlatItem {
  id: string
  title: string
  depth: number
}
