"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Types.ObjectId,
    state: String,
    productId: mongoose_1.default.Types.ObjectId,
    count: Number,
    cost: Number,
});
exports.OrderCollection = mongoose_1.default.model("orders", orderSchema);
