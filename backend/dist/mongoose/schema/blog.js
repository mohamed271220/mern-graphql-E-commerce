"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    head: String,
    intro: String,
    end: String,
    image: String,
    ccontent: [
        {
            title: String,
            paragraph: String,
        },
    ],
});
exports.BlogCollection = mongoose_1.default.model("blogs", BlogSchema);
