"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewType = exports.imageType = void 0;
const graphql_1 = require("graphql");
exports.imageType = new graphql_1.GraphQLObjectType({
    name: "image",
    fields: () => ({
        productPath: { type: graphql_1.GraphQLString },
        ProductName: { type: graphql_1.GraphQLString },
        _id: { type: graphql_1.GraphQLString },
    }),
});
exports.ReviewType = new graphql_1.GraphQLObjectType({
    name: "review",
    fields: () => ({
        image: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        review: { type: graphql_1.GraphQLString },
        _id: { type: graphql_1.GraphQLString },
    }),
});
