import express from 'express'
import { createChat, findChat, getAllChat } from '../controllers/chatController'
export const chatRouter=express.Router()

chatRouter.post('/create-chat',createChat)
chatRouter.get('/getAll-chat/:userId',getAllChat)
chatRouter.post('/findAll-chat',findChat)