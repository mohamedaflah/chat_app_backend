import mongoose from "mongoose";
// const messageSchema = mongoose.Schema(
//   {
//     message: {
//       text: { type: String, required: true },
//     },
//     users: Array,
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
const messageModel = new mongoose.Schema(
  {
    chatId: mongoose.Schema.Types.ObjectId,
    senderId:mongoose.Schema.Types.ObjectId,
    content:String,
    date:Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(process.env.Messages ?? "Messages", messageModel);
