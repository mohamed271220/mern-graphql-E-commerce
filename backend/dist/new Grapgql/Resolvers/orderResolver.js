"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderResolver = void 0;
const order_1 = require("../../mongoose/schema/order");
exports.orderResolver = {
    Query: {
        order(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("order");
                return yield order_1.OrderCollection.findById(args.id);
            });
        },
        orders() {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("orders");
                return yield order_1.OrderCollection.find({});
            });
        },
    },
    Mutation: {
        updateOrder(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(args);
                const res = yield order_1.OrderCollection.findByIdAndUpdate(args.input._id, {
                    state: args.input.state,
                    deliveredAt: args.input.deliveredAt,
                });
                return { msg: `order is at  ${args.input.state} mode` };
            });
        },
        deleteOrder(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const length = args._id.length;
                yield order_1.OrderCollection.deleteMany({ _id: { $in: args._id } });
                return {
                    msg: `${length} ${length >= 2 ? "orders" : "order"} ${length >= 2 ? "are" : "is"} successfully deleted`,
                };
            });
        },
    },
};
