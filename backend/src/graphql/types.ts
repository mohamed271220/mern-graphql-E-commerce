import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const imageType = new GraphQLObjectType({
  name: "images",
  fields: () => ({
    productPath: { type: GraphQLString },
    ProductName: { type: GraphQLString },
    _id: { type: GraphQLID },
  }),
});

export const ReviewType = new GraphQLObjectType({
  name: "reviews",
  fields: () => ({
    image: { type: GraphQLString },
    user: { type: GraphQLString },
    review: { type: GraphQLString },
    rate: { type: GraphQLInt },
    status: { type: GraphQLInt },
    msg: { type: GraphQLString },
    userId: { type: GraphQLID },
    _id: { type: GraphQLID },
  }),
});
