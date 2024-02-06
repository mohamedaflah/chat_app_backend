import { Request, Response } from "express";
import MessageModel from "../Model/MessageModel";

export const getMessageController = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;

    const messages = await MessageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg: any) => {
      return {
        fromSelf: msg.sender == from,
        message: msg.message.text,
      };
    });
    res.status(200).json({ status: true, projectedMessages });
  } catch (error: any) {
    res.status(400).json({ status: false, err: error.message });
  }
};
export const addMessageController = async (req: Request, res: Response) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) res.json({ status: true, message: "Message added successfull" });
  } catch (error: any) {
    res.status(400).json({ status: false, err: error.message });
  }
};
