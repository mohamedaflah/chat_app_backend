import express, { Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoute";
import { Socket } from "socket.io";
import { chatRouter } from "./routes/chatRoutes";
import { messageRouter } from "./routes/messageRoute";
import { v4 as uuidv4 } from "uuid";
import { chatType } from "./types/UserModelType";

const socket = require("socket.io");
dotenv.config();
declare global {
  namespace NodeJS {
    interface Global {
      onlineUsers: Map<any, any>; // Adjust the types accordingly
      chatSocket?: Socket;
    }
  }
}
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use("/", router);
app.use("/chat", chatRouter);
app.use("/messages", messageRouter);
const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

const io: Socket = socket(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
declare global {
  var onlineUsers: Map<any, any>;
}
global.onlineUsers = new Map();
let onlineUsersList: { userId: string; socketId: string }[] = [];
io.on("connection", (socket) => {
  // console.log(socket.id);
  // listen to a connection

  (global as NodeJS.Global).chatSocket = socket;
  socket.on("add-user", (userId: string) => {
    onlineUsers.set(userId, socket.id);
    !onlineUsersList.some((user) => user.userId === userId) &&
      onlineUsersList.push({
        userId,
        socketId: socket.id,
      });
    console.log(`users ${JSON.stringify(onlineUsersList)}`);

    io.emit("getOnlineUsers", onlineUsersList);
  });

  socket.on("disconnect", () => {
    onlineUsersList = onlineUsersList.filter(
      (user) => user.socketId !== socket.id
    );

    io.emit("getOnlineUsers", onlineUsersList);
  });

  socket.on("send-message", (data: any) => {
    console.log("called send", data);
    const user = onlineUsersList.find(
      (user) => user.userId === data.recipienId
    );
    const Id = uuidv4();
    const sendingData: chatType = {
      _id: Id,
      chatId: data.chatId,
      content: data.message,
      senderId: data.senderId,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date(),
    };
    if (user) {
      io.to(user.socketId).emit("getMessage", sendingData);
    }
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(data);

      socket.to(sendUserSocket).emit("msg-recieved", data.message);
    }
  });
  socket.on(
    "typing",
    (data: { msg: string; recipienId: string; name: string; Id: string }) => {
      const user = onlineUsersList.find(
        (user) => user.userId == data.recipienId
      );

      if (user) {
        io.to(user.socketId).emit("typing", data);
      }
    }
  );
  socket.on(
    "stoppedTyping",
    (data: { msg: string; recipienId: string; name: string; Id: string }) => {
      const user = onlineUsersList.find(
        (user) => user.userId == data.recipienId
      );

      if (user) {
        io.to(user.socketId).emit("stoppedTyping", data);
      }
    }
  );
});
