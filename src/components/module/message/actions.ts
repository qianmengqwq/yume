'use server'

import { db } from '@/db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const MessageSchema = z.object({
  message: z.string().min(1, '消息不能为空').max(500, '消息长度不能超过500字符'),
})

interface MessageState {
  success: boolean
  message: string
}

export async function createMessage(_currentState: MessageState, formData: FormData) {
  const user = await currentUser()

  if (!user) {
    return {
      success: false,
      message: '请先登录',
    }
  }

  const validationResult = MessageSchema.safeParse({
    message: formData.get('message'),
  })

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors.map(err => err.message).join('\n'),
    }
  }

  await db.message.create({
    data: {
      message: validationResult.data.message ?? '',
      userId: user.id,
      userName: (user.username || user.firstName) ?? '神秘',
      userImg: user.imageUrl,
    },
  })

  revalidatePath('/message')
  return {
    success: true,
    message: '留言发送成功',
  }
}
