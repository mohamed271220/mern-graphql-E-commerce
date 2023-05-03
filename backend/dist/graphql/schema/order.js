"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderType = exports.orderProduct = void 0;
const graphql_1 = require("graphql");
const date_1 = require("./types/date");
exports.orderProduct = new graphql_1.GraphQLObjectType({
    name: "productorder",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        count: { type: graphql_1.GraphQLInt },
    }),
});
exports.orderType = new graphql_1.GraphQLObjectType({
    name: "orders",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        userId: { type: graphql_1.GraphQLID },
        state: { type: graphql_1.GraphQLString },
        msg: { type: graphql_1.GraphQLString },
        productId: { type: new graphql_1.GraphQLList(exports.orderProduct) },
        count: { type: graphql_1.GraphQLInt },
        cost: { type: graphql_1.GraphQLFloat },
        createdAt: { type: date_1.DateType },
        deliveredAt: { type: date_1.DateType },
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
