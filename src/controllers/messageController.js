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
exports.getMessages = exports.createMessages = void 0;
const MessageModel_1 = __importDefault(require("../Model/MessageModel"));
const mongodb_1 = require("mongodb");
// _______________________________________________
// createMessage
// _______________________________________________
const createMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId, senderId, content } = req.body;
        console.log("🚀 ~ createMessages ~ chatId: $$$$  ", chatId);
        yield new MessageModel_1.default({
            chatId,
            senderId,
            content,
            date: Date.now(),
        }).save();
        const messages = yield MessageModel_1.default.find({ chatId: new mongodb_1.ObjectId(chatId) });
        console.log("🚀 ~ createMessages ~ messages:", messages);
        res.status(200).json({ status: true, messages, chatId });
    }
    catch (error) {
        res.status(400).json({ status: false, err: error.message });
    }
});
exports.createMessages = createMessages;
// _______________________________________________
// getMessages
// _______________________________________________
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const messages = yield MessageModel_1.default.find({ chatId: new mongodb_1.ObjectId(chatId) });
        res.status(200).json({ status: true, messages });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: true, err: error.message });
    }
});
exports.getMessages = getMessages;
