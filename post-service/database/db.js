import mongoose from "mongoose";
import { db_uri } from "../config";

export const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/tasks");
    await mongoose.connect(db_uri);
    console.log("DB Connection Sucessful");
  } catch (error) {
    console.log("DB Connection Failed");
  }
};
