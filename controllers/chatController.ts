import ChatModal from "../Model/ChatModal";
import  { Request, Response } from "express";
import MessageModel from "../Model/MessageModel";
import UserModal from "../Model/UserModal";
// __________________________________________________________
// Create chat
// __________________________________________________________
export const createChat = async (req: Request, res: Response) => {
  const { firstId, secondId } = req.body;
  
  
  const chat = await ChatModal.findOne({
    members: { $all: [firstId, secondId] },
  });
  const selectedUser=await UserModal.findById(secondId)
  console.log("🚀 ~ createChat ~ chat:", chat)
  
  
  
  if (chat) return res.status(200).json({ status: true, chat,selectedUser });
  const newChat = await new ChatModal({
    members: [firstId,secondId],
  }).save();
  
  res.status(200).json({ status: true, chat:newChat,selectedUser });
  try {
  } catch (error: Error | any) {
    console.log(error);
    
    res.status(400).json({ status: true, err: error.message });
  }
};

// ______________________________________________________________
// get all chats
// ______________________________________________________________
export const getAllChat = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chat = await ChatModal.find({
      members: { $in: [userId] },
    });

    res.status(200).json({ status: true, chat });
  } catch (error: Error | any) {
    res.status(400).json({ status: false, err: error.message });
  }
};

// ______________________________________________________________
// find specific chat with userId
// ______________________________________________________________

export const findChat = async (req: Request, res: Response) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await ChatModal.findOne({
      members: { $all: [firstId, secondId] },
    });
    const messages=await MessageModel.find({chatId:chat?._id})
    res.status(200).json({status:true,chat,messages})
  } catch (error:Error | any) {
    res.status(400).json({ status: false, err: error.message });
  }
};
