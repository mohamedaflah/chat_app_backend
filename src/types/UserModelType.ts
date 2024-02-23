export interface userModelType {
  username: string;
  password: string;
  email: string;
  profile?: string;
}

export type chatType = {
  _id: string;
  chatId: string;
  content: string;
  senderId: string;
  senderName:string
  createdAt: Date;
  updatedAt: Date;
  date: Date;
};
