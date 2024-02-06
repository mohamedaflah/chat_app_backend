import express, { Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoute";
import { Socket } from "socket.io";
const socket=require('socket.io')
dotenv.config();
declare global {
  namespace NodeJS {
    interface Global {
      onlineUsers: Map<any, any>; // Adjust the types accordingly
      chatSocket?: Socket
    }
  }
}
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/", router);
const server=app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

const io:Socket=socket(server,{
  cors:{
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
})
declare global {
  var onlineUsers: Map<any, any>;
}
global.onlineUsers=new Map()
io.on("connection",(socket)=>{
  console.log('user connected');
  
  (global as NodeJS.Global).chatSocket = socket;
  socket.on("add-user",(userId:any)=>{
    onlineUsers.set(userId,socket.id)
  })

  socket.on("send-message",(data:any)=>{
    const sendUserSocket=onlineUsers.get(data.to)
    if(sendUserSocket){
      console.log(data);
      
      socket.to(sendUserSocket).emit("msg-recieved",data.message)
    }
  })
})