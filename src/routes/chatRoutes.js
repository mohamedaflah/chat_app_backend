"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
exports.chatRouter = express_1.default.Router();
exports.chatRouter.post('/create-chat', chatController_1.createChat);
exports.chatRouter.get('/getAll-chat/:userId', chatController_1.getAllChat);
exports.chatRouter.post('/findAll-chat', chatController_1.findChat);
