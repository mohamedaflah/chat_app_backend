"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChat = exports.getAllChat = exports.createChat = void 0;
const ChatModal_1 = __importDefault(require("../Model/ChatModal"));
const MessageModel_1 = __importDefault(require("../Model/MessageModel"));
const UserModal_1 = __importDefault(require("../Model/UserModal"));
// __________________________________________________________
// Create chat
// __________________________________________________________
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstId, secondId } = req.body;
    const chat = yield ChatModal_1.default.findOne({
        members: { $all: [firstId, secondId] },
    });
    const selectedUser = yield UserModal_1.default.findById(secondId);
    console.log("🚀 ~ createChat ~ chat:", chat);
    if (chat)
        return res.status(200).json({ status: true, chat, selectedUser });
    const newChat = yield new ChatModal_1.default({
        members: [firstId, secondId],
    }).save();
    res.status(200).json({ status: true, chat: newChat, selectedUser });
    try {
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: true, err: error.message });
    }
});
exports.createChat = createChat;
// ______________________________________________________________
// get all chats
// ______________________________________________________________
const getAllChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const chat = yield ChatModal_1.default.find({
            members: { $in: [userId] },
        });
        res.status(200).json({ status: true, chat });
    }
    catch (error) {
        res.status(400).json({ status: false, err: error.message });
    }
});
exports.getAllChat = getAllChat;
// ______________________________________________________________
// find specific chat with userId
// ______________________________________________________________
const findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstId, secondId } = req.body;
    try {
        const chat = yield ChatModal_1.default.findOne({
            members: { $all: [firstId, secondId] },
        });
        const messages = yield MessageModel_1.default.find({ chatId: chat === null || chat === void 0 ? void 0 : chat._id });
        res.status(200).json({ status: true, chat, messages });
    }
    catch (error) {
        res.status(400).json({ status: false, err: error.message });
    }
});
exports.findChat = findChat;
