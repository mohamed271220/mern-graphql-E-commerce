import { imagesInterface } from "./user";

export interface reviewInterface {
  image: string;
  user: string;
  review: string;
  _id: string;
  rate: number;
  userId?: string;
}

export interface ProductInterface {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: imagesInterface[];
  rating: number[];
  reviews: reviewInterface[];
}
