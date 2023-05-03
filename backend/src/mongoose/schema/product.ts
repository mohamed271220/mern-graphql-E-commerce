import mongoose, { Model } from "mongoose";

const imageSchema = new mongoose.Schema({
  productPath: String,
  ProductName: String,
});

interface imageInterface {
  productPath: string;
  ProductName: string;
}

interface reviewInterface {
  image: string;
  user: string;
  userId: string;
  review: string;
  rate: number;
  status?: number;
  msg?: string;
}

export interface productInterface {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: imageInterface[];
  rating: number[];
  reviews: reviewInterface[];
}

const reviewSchema = new mongoose.Schema({
  image: String,
  user: String,
  review: String,
  userId: mongoose.Types.ObjectId,
  rate: Number,
});

export const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: { type: Number, min: 0 },
  category: String,
  state: String,
  images: [imageSchema],
  rating: [Number],
  reviews: [reviewSchema],
  createdAt: Date,
});

const productCollection: Model<productInterface> =
  mongoose.model<productInterface>("products", productSchema);
export default productCollection;
