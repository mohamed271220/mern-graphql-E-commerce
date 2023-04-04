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
  review: string;
}

interface productInterface {
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
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: { type: Number, min: 0 },
  category: String,
  images: [imageSchema],
  rating: [Number],
  reviews: [reviewSchema],
});

const productCollection: Model<productInterface> =
  mongoose.model<productInterface>("products", productSchema);
export default productCollection;
