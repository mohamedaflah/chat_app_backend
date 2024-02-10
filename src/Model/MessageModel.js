"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
const messageModel = new mongoose_1.default.Schema({
    chatId: mongoose_1.default.Schema.Types.ObjectId,
    senderId: mongoose_1.default.Schema.Types.ObjectId,
    content: String,
    date: Date,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model((_a = process.env.Messages) !== null && _a !== void 0 ? _a : "Messages", messageModel);
