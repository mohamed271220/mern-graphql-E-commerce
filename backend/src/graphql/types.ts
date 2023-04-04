import { GraphQLObjectType, GraphQLString } from "graphql";

export const imageType = new GraphQLObjectType({
  name: "image",
  fields: () => ({
    productPath: { type: GraphQLString },
    ProductName: { type: GraphQLString },
    _id: { type: GraphQLString },
  }),
});

export const ReviewType = new GraphQLObjectType({
  name: "review",
  fields: () => ({
    image: { type: GraphQLString },
    user: { type: GraphQLString },
    review: { type: GraphQLString },
    _id: { type: GraphQLString },
  }),
});
