'server only'

import type { z } from 'zod'
import type { createDraftSchema, createNoteSchema } from './schema'
import { slugify } from '@/components/mdx/utils'
import { DEFAULT_CATEGORY_ID } from '@/constants/defaults'
import prisma from '@/db/prisma'
import { ArticleType } from '@/generated'

export async function createDraft(input: z.infer<typeof createDraftSchema>) {
  const { title, content, description, cover, published, categoryId } = input
  const slug = slugify(title)
  return await prisma.article.create({
    data: { title, content, description, cover, type: ArticleType.DRAFT, published, categoryId: categoryId ?? DEFAULT_CATEGORY_ID, slug },
  })
}

export async function createNote(input: z.infer<typeof createNoteSchema>) {
  const { title, content, description, cover, published, categoryId, mood, weather, location } = input
  const slug = slugify(title)
  return await prisma.article.create({
    data: { title, content, description, cover, type: ArticleType.NOTE, published, categoryId: categoryId ?? DEFAULT_CATEGORY_ID, mood, weather, location, slug },
  })
}
