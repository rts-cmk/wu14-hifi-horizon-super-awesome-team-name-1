import { Router } from 'express'
import db from '@/db/index'
import { contactMessageInsertSchema, contactMessages } from '@/db/schema'
import { catchErrors } from '@/lib/async'
import { check } from '@/lib/validate'

const router = Router()

router.post(
    '/',
    catchErrors(async (req, res) => {
        const validatedData = check(contactMessageInsertSchema, req.body)
        const [newMessage] = await db.insert(contactMessages).values(validatedData).returning()

        return res.status(201).json({
            message: 'Contact message submitted successfully',
            contact: newMessage
        })
    })
)

router.get(
    '/',
    catchErrors(async (_req, res) => {
        const messages = await db.select().from(contactMessages).orderBy(contactMessages.createdAt)
        return res.status(200).json(messages)
    })
)

export default router
