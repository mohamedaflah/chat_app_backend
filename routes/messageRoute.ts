import express from 'express'
import { addMessageController, getMessageController } from '../controllers/messageController'
const messageRouter=express.Router()

messageRouter.post('/add-message',addMessageController)
messageRouter.post('/get-message',getMessageController)