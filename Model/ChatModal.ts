import mongoose from "mongoose";

const chatModel = new mongoose.Schema(
  {
    members: Array,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chats", chatModel);
