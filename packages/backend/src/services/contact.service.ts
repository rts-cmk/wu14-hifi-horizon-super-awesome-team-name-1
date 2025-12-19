import type { z } from 'zod'
import db from '@/db'
import { type contactMessageInsertSchema, contactMessages } from '@/db/schema'

export class ContactService {
    async createMessage(data: z.infer<typeof contactMessageInsertSchema>) {
        const [newMessage] = await db.insert(contactMessages).values(data).returning()
        return newMessage
    }

    async getAllMessages() {
        return await db.select().from(contactMessages).orderBy(contactMessages.createdAt)
    }
}

export const contactService = new ContactService()
