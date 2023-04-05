import mongoose from "mongoose";
import { productInterface, productSchema } from "./product";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  fav: [productSchema],
  cart: [productSchema],
});

export const userCollection = mongoose.model("users", userSchema);
