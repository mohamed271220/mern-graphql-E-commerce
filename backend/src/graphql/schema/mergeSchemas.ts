import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userMutation } from "./user.js";
import { productMutation, productQuery } from "./product.js";
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

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...productQuery.getFields(),
    //   ...userQuery.getFields(),
  } as any,
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...productMutation.getFields(),
    ...userMutation.getFields(),
  } as any,
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
export default schema;
