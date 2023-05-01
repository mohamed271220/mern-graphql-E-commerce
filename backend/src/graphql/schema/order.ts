import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { OrderCollection } from "../../mongoose/schema/order";

export const orderType = new GraphQLObjectType({
  name: "orders",
  fields: () => ({
    _id: { type: GraphQLID },

    userId: { type: GraphQLID },
    state: { type: GraphQLString },
    msg: { type: GraphQLString },
    productId: { type: GraphQLID },
    count: { type: GraphQLInt },
    cost: { type: GraphQLInt },
  }),
});

// export const orderQuery = new GraphQLObjectType({
//   name: "orderQuary",
//   fields: {
//     orders: {
//       type: orderType,
//       async resolve(_, _args) {
//         return await OrderCollection.find();
//       },
//     },
//   },
// });
