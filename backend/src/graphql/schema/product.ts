import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { ReviewType, imageType } from "../types.js";
import productCollection from "../../mongoose/schema/product.js";
import { userMutation } from "./user.js";
import { orderType } from "./order.js";
import { OrderCollection } from "../../mongoose/schema/order.js";

export const productType = new GraphQLObjectType({
  name: "products",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock: { type: GraphQLString },
    category: { type: GraphQLString },
    state: { type: GraphQLString },
    images: { type: new GraphQLList(imageType) },
    rating: { type: new GraphQLList(GraphQLInt) },
    reviews: { type: new GraphQLList(ReviewType) },
    avgRate: { type: GraphQLFloat },
  }),
});

export const productQuery = new GraphQLObjectType({
  name: "query",
  fields: {
    product: {
      type: productType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return productCollection.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(productType),
      resolve(_par: any, _args: any) {
        return productCollection.find({});
      },
    },
    orders: {
      type: new GraphQLList(orderType),
      async resolve(_, _args) {
        return await OrderCollection.find();
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

export const graphQlSchema = new GraphQLSchema({
  query: productQuery,
  // mutation: productMutation,
});
