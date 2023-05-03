import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLInputType,
  GraphQLInputObjectType,
} from "graphql";
import { OrderCollection } from "../../mongoose/schema/order";
import { DateType } from "./types/date";

export const orderProduct = new GraphQLObjectType({
  name: "productorder",
  fields: () => ({
    id: { type: GraphQLID },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    title: { type: GraphQLString },
    count: { type: GraphQLInt },
  }),
});

export const orderType = new GraphQLObjectType({
  name: "orders",

  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    state: { type: GraphQLString },
    msg: { type: GraphQLString },
    productId: { type: new GraphQLList(orderProduct) },
    count: { type: GraphQLInt },
    cost: { type: GraphQLFloat },
    createdAt: { type: DateType },
    deliveredAt: { type: DateType },
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
