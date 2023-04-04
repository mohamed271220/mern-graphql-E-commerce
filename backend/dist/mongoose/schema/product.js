"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    productPath: String,
    ProductName: String,
});
const reviewSchema = new mongoose_1.default.Schema({
    image: String,
    user: String,
    review: String,
});
const productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    stock: { type: Number, min: 0 },
    category: String,
    images: [imageSchema],
    rating: [Number],
    reviews: [reviewSchema],
});
const productCollection = mongoose_1.default.model("products", productSchema);
exports.default = productCollection;
