"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResolver = void 0;
const product_1 = __importDefault(require("../../mongoose/schema/product"));
exports.productResolver = {
    Query: {
        products() {
            return product_1.default.find();
        },
        product(_, args) {
            return product_1.default.findById(args.id);
        },
    },
};
