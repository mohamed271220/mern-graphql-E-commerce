"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewType = exports.imageType = void 0;
const graphql_1 = require("graphql");
exports.imageType = new graphql_1.GraphQLObjectType({
    name: "images",
    fields: () => ({
        productPath: { type: graphql_1.GraphQLString },
        ProductName: { type: graphql_1.GraphQLString },
        _id: { type: graphql_1.GraphQLID },
    }),
});
exports.ReviewType = new graphql_1.GraphQLObjectType({
    name: "reviews",
    fields: () => ({
        image: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        review: { type: graphql_1.GraphQLString },
        rate: { type: graphql_1.GraphQLInt },
        msg: { type: graphql_1.GraphQLString },
        userId: { type: graphql_1.GraphQLID },
        _id: { type: graphql_1.GraphQLID },
    }),
});
