import mongoose from "mongoose";
import { productInterface, productSchema } from "./product";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  fav: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
    },
  ],
  cart: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      count: Number,
    },
  ],
});

export const userCollection = mongoose.model("users", userSchema);
