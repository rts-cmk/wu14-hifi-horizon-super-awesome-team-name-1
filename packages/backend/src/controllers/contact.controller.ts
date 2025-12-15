import type { Request, Response } from 'express'
import { contactMessageInsertSchema } from '@/db/schema'
import { contactService } from '@/services/contact.service'

export class ContactController {
    async create(req: Request, res: Response) {
        try {
            const validatedData = contactMessageInsertSchema.parse(req.body)
            const newMessage = await contactService.createMessage(validatedData)

            return res.status(201).json({
                message: 'Contact message submitted successfully',
                contact: newMessage
            })
        } catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: 'Invalid input', details: error })
            }
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const messages = await contactService.getAllMessages()
            return res.status(200).json(messages)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export const contactController = new ContactController()
