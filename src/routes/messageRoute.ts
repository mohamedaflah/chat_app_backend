import express from 'express'
import { createMessages, getMessages } from '../controllers/messageController'
export const messageRouter=express.Router()

messageRouter.post('/create-message',createMessages)
messageRouter.get('/get-message/:chatId',getMessages)