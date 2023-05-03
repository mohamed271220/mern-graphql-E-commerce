import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  state: String,
  productId: [{ id: mongoose.Types.ObjectId, count: Number }],
  count: Number,
  cost: Number,
  createdAt: Date,
  deliveredAt: Date,
});

export const OrderCollection = mongoose.model("orders", orderSchema);
