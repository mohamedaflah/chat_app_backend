import mongoose from "mongoose";
require('dotenv').config()
const dbURL: string = process.env.DATABASE_URI ?? "";

mongoose
  .connect(dbURL,{dbName:"chatApp"})
  .then((res) => {
    console.log(`db connection is success`);
  })
  .catch((err) => {
    console.log(`Error find during db connection ${err}`);
  });
