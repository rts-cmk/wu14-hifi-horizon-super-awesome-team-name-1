import db from '@/db'
import { contactMessageInsertSchema, contactMessages } from '@/db/schema'
import type { z } from 'zod'

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
