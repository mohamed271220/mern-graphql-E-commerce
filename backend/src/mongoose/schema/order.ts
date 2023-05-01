import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  state: String,
  productId: mongoose.Types.ObjectId,
  count: Number,
  cost: Number,
});

export const OrderCollection = mongoose.model("orders", orderSchema);
