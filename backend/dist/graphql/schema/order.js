"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderType = void 0;
const graphql_1 = require("graphql");
exports.orderType = new graphql_1.GraphQLObjectType({
    name: "orders",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        userId: { type: graphql_1.GraphQLID },
        state: { type: graphql_1.GraphQLString },
        msg: { type: graphql_1.GraphQLString },
        productId: { type: graphql_1.GraphQLID },
        count: { type: graphql_1.GraphQLInt },
        cost: { type: graphql_1.GraphQLInt },
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
