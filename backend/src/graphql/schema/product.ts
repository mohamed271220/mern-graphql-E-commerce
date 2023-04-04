import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { ReviewType, imageType } from "../types.js";
import productCollection from "../../mongoose/schema/product.js";

const productType = new GraphQLObjectType({
  name: "products",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock: { type: GraphQLString },
    category: { type: GraphQLString },
    images: { type: new GraphQLList(imageType) },
    rating: { type: new GraphQLList(GraphQLInt) },
    reviews: { type: new GraphQLList(ReviewType) },
  }),
});

const query = new GraphQLObjectType({
  name: "query",
  fields: {
    product: {
      type: productType,
      args: { id: { type: GraphQLString } },
      resolve(_, args) {
        return productCollection.findById(args.id);
      },
    },
  },
});

const graphQlSchema = new GraphQLSchema({
  query,
});
export default graphQlSchema;
