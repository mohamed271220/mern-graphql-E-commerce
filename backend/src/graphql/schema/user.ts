import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { userCollection } from "../../mongoose/schema/user.js";
import { hashPassword } from "../../middlewares/hashPassword.js";
import { authenticateMiddleware } from "../../middlewares/authenticate.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config.js";
import { productType } from "./product.js";
import productCollection from "../../mongoose/schema/product.js";

const messageType = new GraphQLObjectType({
  name: "message",
  fields: () => ({
    msg: { type: GraphQLString },
  }),
});

const cartType = new GraphQLObjectType({
  name: "carts",
  fields: () => ({
    productId: { type: GraphQLID },
    count: { type: GraphQLInt },
    _id: { type: GraphQLID },
    path: { type: GraphQLString },
    price: { type: GraphQLInt },
    title: { type: GraphQLString },
    msg: { type: GraphQLString },
  }),
});

const favtType = new GraphQLObjectType({
  name: "fav",
  fields: () => ({
    productId: { type: GraphQLID },
    _id: { type: GraphQLID },
    path: { type: GraphQLString },
    price: { type: GraphQLInt },
    title: { type: GraphQLString },
    msg: { type: GraphQLString },
  }),
});

const userType = new GraphQLObjectType({
  name: "users",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    msg: { type: GraphQLString },
    phone: { type: GraphQLInt },
    fav: { type: new GraphQLList(favtType) },
    cart: { type: new GraphQLList(cartType) },
    favArr: {
      type: new GraphQLList(productType),
      resolve(par, arg) {
        const arrOfIds = par.fav.map((e: any) => e.productId);
        console.log(arrOfIds);
        return productCollection.find(
          { "images._id": { $in: arrOfIds } },
          { "images.$": 1, price: 1, title: 1 }
        );
      },
    },
  }),
});

const userMutation = new GraphQLObjectType({
  name: "userMutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        msg: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const check = await userCollection.find({ email: args.email });
        if (check.length > 0) {
          return { email: args.email, msg: "this email has registered" };
        } else {
          const res = await userCollection.create({
            ...args,
            password: hashPassword(args.password),
          });
          return { ...res, msg: "user created successfully" };
        }
      },
    },
    authenticate: {
      type: messageType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (_, args, { res }) => {
        try {
          const result = await authenticateMiddleware(
            args.email,
            args.password
          );
          console.log(result);
          if (Array.isArray(result)) {
            if (result.length > 0) {
              const expire = { expiresIn: "100h" };
              const accessToken = jwt.sign(
                { result },
                ACCESS_TOKEN_SECRET as unknown as string,
                expire
              );
              const refToken = jwt.sign(
                { result },
                REFRESH_TOKEN_SECRET as unknown as string,
                expire
              );
              const id = result[0]._id.toString();
              console.log({ id });
              res.cookie("user-email", result[0].email as unknown as string);
              res.cookie("user-id", id as unknown as string);
              res.cookie("access-token", accessToken);
              res.cookie("refresh-token", refToken);
              return { msg: "you successfully loggedIn" };
            }
          } else if (!result) {
            return { msg: "password is wrong" };
          } else {
            return { msg: result };
          }
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    addToCart: {
      type: cartType,
      args: {
        userId: { type: GraphQLID },
        productId: { type: GraphQLID },
        count: { type: GraphQLInt },
        title: { type: GraphQLString },
        path: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        try {
          const { price, title, path, count, productId } = args;
          const res = await userCollection.findByIdAndUpdate(
            args.userId,
            {
              $push: { cart: { price, title, path, count, productId } },
            },
            { new: true }
          );
          console.log(res);
          return { ...res, msg: "successfully added to your cart" };
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    addToFav: {
      type: favtType,
      args: {
        productId: { type: GraphQLID },
        title: { type: GraphQLString },
        path: { type: GraphQLString },
        price: { type: GraphQLInt },
        userId: { type: GraphQLID },
      },
      resolve: async (_, args) => {
        try {
          const res = await userCollection.findByIdAndUpdate(
            args.userId,
            {
              $push: { fav: args },
            },
            { new: true }
          );
          console.log(res);
          return { ...res, msg: "successfully added to your favorites" };
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    removeFromFav: {
      type: messageType,
      args: {
        productId: { type: new GraphQLList(GraphQLID) },
        userId: { type: GraphQLID },
      },
      resolve: async (_, args) => {
        try {
          await userCollection.findByIdAndUpdate(
            args.userId,
            {
              $pull: { fav: { productId: { $in: args.productId } } },
            },
            { new: true }
          );
          return { msg: "removed from your favorites" };
        } catch (err) {
          return (err as Error).message;
        }
      },
    },

    removeFromCart: {
      type: messageType,
      args: {
        productId: { type: new GraphQLList(GraphQLID) },
        userId: { type: GraphQLID },
      },
      resolve: async (_, args) => {
        try {
          await userCollection.findByIdAndUpdate(
            args.userId,
            {
              $pull: { cart: { productId: { $in: args.productId } } },
            },
            { new: true }
          );
          return { msg: "removed from your cart" };
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    changeCartCount: {
      type: messageType,
      args: {
        productId: { type: GraphQLID },
        userId: { type: GraphQLID },
        count: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        try {
          await userCollection.findOneAndUpdate(
            {
              _id: args.userId,
              "cart.productId": args.productId,
            },
            {
              $set: { "cart.$.count": args.count },
            },
            { new: true }
          );
          return { msg: "count successfully changed" };
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    getUserData: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(par, args) {
        return userCollection.findById(args.id);
      },
    },
  },
});

const userSchema = new GraphQLSchema({
  mutation: userMutation,
});

console.log(cartType);
export default userSchema;
