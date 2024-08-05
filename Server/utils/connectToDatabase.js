import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const Db = process.env.MONGO;

export async function connectToDatabase() {
  try {
    await mongoose.connect(Db);
    console.log("Mongo Db connected");
  } catch (err) {
    console.log("Error occured :", err);
  }
}
