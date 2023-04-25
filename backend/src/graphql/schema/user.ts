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
import {
  authenticateMiddleware,
  checkOldPass,
} from "../../middlewares/authenticate.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config.js";
import { productType } from "./product.js";
import productCollection from "../../mongoose/schema/product.js";
import { ReviewType } from "../types.js";

const messageType = new GraphQLObjectType({
  name: "message",
  fields: () => ({
    msg: { type: GraphQLString },
    status: { type: GraphQLInt },
  }),
});

const cartType = new GraphQLObjectType({
  name: "carts",
  fields: () => ({
    productId: { type: GraphQLID },
    parentId: { type: GraphQLID },
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
    parentId: { type: GraphQLID },
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
    image: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    msg: { type: GraphQLString },
    phone: { type: GraphQLInt },
    status: { type: GraphQLInt },
    fav: { type: new GraphQLList(favtType) },
    cart: { type: new GraphQLList(cartType) },
    // favArr: {
    //   type: new GraphQLList(productType),
    //   resolve(par, arg) {
    //     const arrOfIds = par.fav.map((e: any) => e.productId);
    //     console.log(arrOfIds);
    //     return productCollection.find(
    //       { "images._id": { $in: arrOfIds } },
    //       { "images.$": 1, price: 1, title: 1 }
    //     );
    //   },
    // },
  }),
});

export const userMutation = new GraphQLObjectType({
  name: "userMutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        // msg: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const check = await userCollection.find({ email: args.email });
        if (check.length > 0) {
          return {
            status: 401,
            email: args.email,
            msg: "this email has registered",
          };
        } else {
          const res = await userCollection.create({
            ...args,
            image:
              "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png",
            password: hashPassword(args.password),
          });
          return { ...res, status: 200, msg: "user created successfully" };
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
              return { msg: "you successfully logged in" };
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

    updateUserName: {
      type: messageType,
      args: { name: { type: GraphQLString }, _id: { type: GraphQLID } },
      async resolve(_, args) {
        await userCollection.findByIdAndUpdate(args._id, { name: args.name });
        return { status: 200, msg: "username is successfully updated  " };
      },
    },
    updateUserPhone: {
      type: userType,
      args: { phone: { type: GraphQLString }, _id: { type: GraphQLID } },
      async resolve(_, args) {
        await userCollection.findByIdAndUpdate(args._id, { phone: args.phone });
      },
    },
    checkOldPassword: {
      type: messageType,
      args: { _id: { type: GraphQLID }, password: { type: GraphQLString } },
      async resolve(_, args) {
        const result = await checkOldPass(args._id, args.password);
        return { msg: result };
      },
    },
    updatePassword: {
      type: userType,
      args: { password: { type: GraphQLString }, _id: { type: GraphQLID } },
      async resolve(_, args) {
        await userCollection.findByIdAndUpdate(args._id, {
          password: hashPassword(args.password),
        });
      },
    },
    updateEmail: {
      type: userType,
      args: { email: { type: GraphQLString }, _id: { type: GraphQLID } },
      async resolve(_, args) {
        const check = await userCollection.find({ email: args.email });
        if (check.length) {
          return { msg: "this email already used" };
        } else {
          await userCollection.findByIdAndUpdate(args._id, {
            email: args.email,
          });
          return { msg: "your email is updated successfully" };
        }
      },
    },
    addToCart: {
      type: cartType,
      args: {
        userId: { type: GraphQLID },
        productId: { type: GraphQLID },
        parentId: { type: GraphQLID },
        count: { type: GraphQLInt },
        title: { type: GraphQLString },
        path: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        try {
          const res = await userCollection.findByIdAndUpdate(
            args.userId,
            {
              $push: { cart: args },
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
        parentId: { type: GraphQLID },
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

    //products
    filterByPrice: {
      type: new GraphQLList(productType),
      args: { price: { type: GraphQLInt } },
      async resolve(_, args) {
        console.log(args);
        if (args.price === 1) {
          return productCollection.find({}).sort({ price: 1 });
        } else if (args.price === -1) {
          return productCollection.find({}).sort({ price: -1 });
        } else {
          return productCollection.find({ price: { $lte: args.price } });
        }
      },
    },

    filterByRate: {
      type: new GraphQLList(productType),
      args: { rate: { type: GraphQLInt } },
      async resolve(_, args) {
        if (args.rate === 1) {
          return await productCollection.aggregate([
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                price: 1,
                stock: 1,
                category: 1,
                state: 1,
                images: 1,
                rating: 1,
                reviews: 1,
                avgRate: { $avg: "$rating" },
              },
            },
            { $sort: { avgRate: 1 } },
          ]);
        } else if (args.rate === -1) {
          return await productCollection.aggregate([
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                price: 1,
                stock: 1,
                category: 1,
                state: 1,
                images: 1,
                rating: 1,
                reviews: 1,
                avgRate: { $avg: "$rating" },
              },
            },
            { $sort: { avgRate: -1 } },
          ]);
        } else {
          return await productCollection.aggregate([
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                price: 1,
                stock: 1,
                category: 1,
                state: 1,
                images: 1,
                rating: 1,
                reviews: 1,
                avgRate: { $avg: "$rating" },
              },
            },
            { $match: { avgRate: { $lte: args.rate } } },
          ]);
        }
      },
    },

    filterBycatageory: {
      type: new GraphQLList(productType),
      args: { category: { type: GraphQLString } },
      async resolve(_, args) {
        return productCollection.find({ category: args.category });
      },
    },

    filterByState: {
      type: new GraphQLList(productType),
      args: { state: { type: GraphQLString } },
      async resolve(_, args) {
        return productCollection.find({ state: args.state });
      },
    },
    filterAllTypes: {
      type: new GraphQLList(productType),
      args: {
        state: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLInt },
        rate: { type: GraphQLInt },
      },
      async resolve(_, args) {
        try {
          console.log(args);
          return await productCollection.aggregate([
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                price: 1,
                stock: 1,
                category: 1,
                state: 1,
                images: 1,
                rating: 1,
                reviews: 1,
                avgRate: { $avg: "$rating" },
              },
            },
            {
              $match: {
                avgRate: { $lte: args.rate },
                price: { $lte: args.price },
                category: { $in: args.category },
                state: { $in: args.state },
              },
            },
          ]);
        } catch (err) {
          console.log((err as Error).message);
        }
      },
    },
    searchProducts: {
      type: new GraphQLList(productType),
      args: { word: { type: GraphQLString } },
      async resolve(_, args) {
        console.log(args);
        return await productCollection.find({
          $or: [
            { category: { $regex: args.word, $options: "i" } },
            { title: { $regex: args.word, $options: "i" } },
          ],
        });
      },
    },
    addReview: {
      type: ReviewType,
      args: {
        userId: { type: GraphQLID },
        _id: { type: GraphQLID },
        rate: { type: GraphQLInt },
        review: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      async resolve(_, args) {
        try {
          const { userId, rate, review, image } = args;
          const data = await productCollection.findByIdAndUpdate(
            args._id,
            {
              $push: { reviews: { userId, rate, review, image } },
            },
            { new: true }
          );
          const addedReview = data!.reviews[data!.reviews.length - 1];
          addedReview.msg = "review added";
          addedReview.status = 200;
          console.log(addedReview);
          return addedReview;
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    updateReview: {
      type: ReviewType,
      args: {
        _id: { type: GraphQLID },
        productId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        review: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      async resolve(_, args) {
        try {
          const { rate, review, image } = args;
          return await productCollection.findOneAndUpdate(
            {
              _id: args.productId,
              "reviews._id": args._id,
            },
            {
              $set: {
                "reviews.$.rate": args.rate,
              },
            }
          );
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
    deleteReview: {
      type: ReviewType,
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(_, args) {
        try {
          return await productCollection.findOneAndDelete({
            "reviews._id": args._id,
          });
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
  },
});

export const userSchema = new GraphQLSchema({
  mutation: userMutation,
});
