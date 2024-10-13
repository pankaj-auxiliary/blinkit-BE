import mongoose from "mongoose";

export const connectDB = (uri) => {
  try {
    mongoose.connect(uri);
  } catch (err) {
    console.log("Database Connection error : ", err);
  }
};
