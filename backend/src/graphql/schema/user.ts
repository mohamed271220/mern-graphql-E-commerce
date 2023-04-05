import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { productType } from "./product.js";
import { userCollection } from "../../mongoose/schema/user.js";
import { hashPassword } from "../../middlewares/hashPassword.js";

const userType = new GraphQLObjectType({
  name: "users",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLInt },
    fav: { type: new GraphQLList(productType) },
    cart: { type: new GraphQLList(productType) },
  }),
});

const userMutation = new GraphQLObjectType({
  name: "userMutation",
  fields: () => ({
    addUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const check = await userCollection.find({ email: args.email });
        if (check.length > 0) {
          return { email: args.email, message: "this email has registered" };
        } else {
          const res = await userCollection.create({
            ...args,
            password: hashPassword(args.password),
          });
          return res;
        }
      },
    },
  }),
});

const userSchema = new GraphQLSchema({
  mutation: userMutation,
});

export default userSchema;
