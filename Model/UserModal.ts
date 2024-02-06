import "../config/dbconfig";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
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
    },
    joinedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(process.env.USER_MODEL ?? "User", userSchema);
