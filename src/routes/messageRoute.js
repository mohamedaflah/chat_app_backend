"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
exports.messageRouter = express_1.default.Router();
exports.messageRouter.post('/create-message', messageController_1.createMessages);
exports.messageRouter.get('/get-message/:chatId', messageController_1.getMessages);
