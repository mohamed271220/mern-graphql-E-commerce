import mongoose from "mongoose";
import { productInterface, productSchema } from "./product";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  country: String,
  phone: String,
  image: String,
  fav: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      parentId: mongoose.SchemaTypes.ObjectId,
      title: String,
      path: String,
      price: Number,
    },
  ],
  cart: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      parentId: mongoose.SchemaTypes.ObjectId,
      count: Number,
      title: String,
      path: String,
      price: Number,
    },
  ],

  compare: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      title: String,
    },
  ],
});

export const userCollection = mongoose.model("users", userSchema);
