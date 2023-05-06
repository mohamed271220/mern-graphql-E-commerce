"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateType = void 0;
const graphql_1 = require("graphql");
exports.DateType = new graphql_1.GraphQLScalarType({
    name: "Date",
    description: "represent the date",
    parseLiteral(AST) {
        if (AST.kind === graphql_1.Kind.STRING) {
            return AST.value;
        }
        else {
            throw new graphql_1.GraphQLError(`${AST.value} is not a date`);
        }
    },
    parseValue(val) {
        return val;
    },
    serialize(value) {
        const date = new Date(value);
        if (date.toString() === "Invalid Date") {
            throw new graphql_1.GraphQLError(`${value} is not a date`);
        }
        else {
            return date.toISOString();
        }
    },
});
