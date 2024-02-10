"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("../config/dbconfig");
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profile: {
        type: String,
        default: "https://github.com/shadcn.png"
    },
    joinedDate: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model((_a = process.env.USER_MODEL) !== null && _a !== void 0 ? _a : "User", userSchema);
