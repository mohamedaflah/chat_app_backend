import { Request, Response } from "express";
import MessageModel from "../Model/MessageModel";
import  { ObjectId } from "mongodb";

// _______________________________________________
// createMessage
// _______________________________________________
export const createMessages = async (req: Request, res: Response) => {
  try {
    const { chatId, senderId, content } = req.body;

    console.log("🚀 ~ createMessages ~ chatId: $$$$  ", chatId)

     await new MessageModel({
      chatId,
      senderId,
      content,
      date: Date.now(),
    }).save();
    const messages=await MessageModel.find({chatId:new ObjectId(chatId)})
    console.log("🚀 ~ createMessages ~ messages:", messages)
    
    res.status(200).json({ status: true, messages,chatId });
  } catch (error: Error | any) {
    res.status(400).json({ status: false, err: error.message });
  }
};

// _______________________________________________
// getMessages
// _______________________________________________
export const getMessages =async (req: Request, res: Response) => {
  try {
    const {chatId}=req.params
    
    
    const messages=await MessageModel.find({chatId:new ObjectId(chatId)})
    res.status(200).json({status:true,messages})
    
  } catch (error: any | Error) {
    console.log(error)
    res.status(400).json({ status: true, err: error.message });
  }
};
