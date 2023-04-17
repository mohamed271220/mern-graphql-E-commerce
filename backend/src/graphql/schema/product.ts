import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { ReviewType, imageType } from "../types.js";
import productCollection from "../../mongoose/schema/product.js";

export const productType = new GraphQLObjectType({
  name: "products",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock: { type: GraphQLString },
    category: { type: GraphQLString },
    state: { type: GraphQLString },
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
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        console.log(args.id);
        return productCollection.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(productType),
      resolve(_par: any, _args: any) {
        return productCollection.find({});
      },
    },
  },
});

const graphQlSchema = new GraphQLSchema({
  query,
});
export default graphQlSchema;
