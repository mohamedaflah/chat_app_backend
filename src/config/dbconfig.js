"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const dbURL = (_a = process.env.DATABASE_URI) !== null && _a !== void 0 ? _a : "";
mongoose_1.default
    .connect(dbURL, { dbName: "chatApp" })
    .then((res) => {
    console.log(`db connection is success`);
})
    .catch((err) => {
    console.log(`Error find during db connection ${err}`);
});
