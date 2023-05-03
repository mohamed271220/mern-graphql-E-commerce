import {
  GraphQLScalarType,
  Kind,
  GraphQLError,
  StringValueNode,
} from "graphql";

export const DateType = new GraphQLScalarType({
  name: "Date",
  description: "represent the date",
  parseLiteral(AST) {
    if (AST.kind === Kind.STRING) {
      return AST.value;
    } else {
      throw new GraphQLError(
        `${(AST as unknown as StringValueNode).value} is not a date`
      );
    }
  },
  parseValue(val) {
    return val;
  },
  serialize(value) {
    const date = new Date(value);

    if (date.toString() === "Invalid Date") {
      throw new GraphQLError(`${value} is not a date`);
    } else {
      return date.toISOString();
    }
  },
});
