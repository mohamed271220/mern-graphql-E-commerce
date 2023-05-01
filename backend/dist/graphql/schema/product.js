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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQlSchema = exports.productQuery = exports.productType = void 0;
const graphql_1 = require("graphql");
const types_js_1 = require("../types.js");
const product_js_1 = __importDefault(require("../../mongoose/schema/product.js"));
const order_js_1 = require("./order.js");
const order_js_2 = require("../../mongoose/schema/order.js");
exports.productType = new graphql_1.GraphQLObjectType({
    name: "products",
    fields: () => ({
        _id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        stock: { type: graphql_1.GraphQLString },
        category: { type: graphql_1.GraphQLString },
        state: { type: graphql_1.GraphQLString },
        images: { type: new graphql_1.GraphQLList(types_js_1.imageType) },
        rating: { type: new graphql_1.GraphQLList(graphql_1.GraphQLInt) },
        reviews: { type: new graphql_1.GraphQLList(types_js_1.ReviewType) },
        avgRate: { type: graphql_1.GraphQLFloat },
    }),
});
exports.productQuery = new graphql_1.GraphQLObjectType({
    name: "query",
    fields: {
        product: {
            type: exports.productType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(_, args) {
                return product_js_1.default.findById(args.id);
            },
        },
        products: {
            type: new graphql_1.GraphQLList(exports.productType),
            resolve(_par, _args) {
                return product_js_1.default.find({});
            },
        },
        orders: {
            type: new graphql_1.GraphQLList(order_js_1.orderType),
            resolve(_, _args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield order_js_2.OrderCollection.find();
                });
            },
        },
    },
});
// export const productMutation = new GraphQLObjectType({
//   name: "productMutation",
//   fields: {
//     filterByPrice: {
//       type: productType,
//       args: { price: { type: GraphQLInt } },
//       resolve(_, args) {
//         if (args.price === 1) {
//           return productCollection.find({}).sort({ price: 1 });
//         } else if (args.price === -1) {
//           return productCollection.find({}).sort({ price: -1 });
//         } else {
//           return null;
//         }
//       },Property 'fields' does not exist on type 'GraphQLObjectType<any, any>'.ts(2339)
//     },
//   },
// });
exports.graphQlSchema = new graphql_1.GraphQLSchema({
    query: exports.productQuery,
    // mutation: productMutation,
});
