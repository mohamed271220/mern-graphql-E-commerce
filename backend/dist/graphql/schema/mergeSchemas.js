"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_js_1 = require("./user.js");
const product_js_1 = require("./product.js");
// const Query = new GraphQLObjectType({
//   name: "Query",
//   fields: () =>
//     ({
//       ...productQuery.getFields(),
//       //   ...userQuery.getFields(),
//     } as any),
// });
// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: () =>
//     ({
//       ...productMutation.getFields(),
//       ...userMutation.getFields(),
//     } as any),
// });
// export const schema = new GraphQLSchema({
//   query: Query,
//   mutation: Mutation,
// });
const Query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: Object.assign({}, product_js_1.productQuery.getFields()),
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: Object.assign(Object.assign({}, product_js_1.productMutation.getFields()), user_js_1.userMutation.getFields()),
});
const schema = new graphql_1.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
exports.default = schema;
