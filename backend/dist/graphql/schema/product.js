"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQlSchema = exports.productQuery = exports.productType = void 0;
const graphql_1 = require("graphql");
const types_js_1 = require("../types.js");
const product_js_1 = __importDefault(require("../../mongoose/schema/product.js"));
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
//       },
//     },
//   },
// });
exports.graphQlSchema = new graphql_1.GraphQLSchema({
    query: exports.productQuery,
    // mutation: productMutation,
});