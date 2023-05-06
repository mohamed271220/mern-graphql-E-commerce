import { Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config.js";
import { authenticateMiddleware } from "../../middlewares/authenticate.js";
import { hashPassword } from "../../middlewares/hashPassword.js";
import { userCollection } from "../../mongoose/schema/user.js";
import { IdInterface } from "../interfaces/graqphInterfaces.js";

interface addToFavInterface {
  input: {
    productId: string;
    parentId: string;
    title: string;
    path: string;
    price: number;
    userId: string;
  };
}

interface removeFromFavInterface {
  input: {
    userId: string;
    productId: string[];
  };
}

export const userResolver = {
  Mutation: {
    addUser: async (_: any, { input }: any) => {
      console.log("signup");
      const check = await userCollection.find({ email: input.email });
      if (check.length > 0) {
        return {
          status: 401,
          email: input.email,
          msg: "this email has registered",
        };
      } else {
        console.log(input);
        const res = await userCollection.create({
          ...input,
          image:
            input.image ||
            "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png",
          password: hashPassword(input.password),
        });
        return { ...res, status: 200, msg: "user created successfully" };
      }
    },

    authenticate: async (
      _: any,
      args: { password: string; email: string },
      //   { res }: { res: Response }
      context: any
    ) => {
      try {
        const result = await authenticateMiddleware(args.email, args.password);
        console.log("result");
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
            context.res.cookie(
              "user-email",
              result[0].email as unknown as string
            );
            context.res.cookie("user-id", id as unknown as string);
            context.res.cookie("access-token", accessToken);
            context.res.cookie("refresh-token", refToken);
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

    async getUserData(par: any, args: IdInterface) {
      return await userCollection.findById(args.id);
    },
    addToCart: async (_: any, { input }: any) => {
      try {
        const res = await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $push: { cart: input },
          },
          { new: true }
        );
        console.log(res);
        return { ...res, msg: "successfully added to your cart" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    removeFromCart: async (
      _: any,
      { input }: { input: { productId: string[]; userId: string } }
    ) => {
      try {
        await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $pull: { cart: { productId: { $in: input.productId } } },
          },
          { new: true }
        );
        return { msg: "removed from your cart" };
      } catch (err) {
        return (err as Error).message;
      }
    },
    changeCartCount: async (
      _: any,
      { input }: { input: { userId: string; productId: string; count: number } }
    ) => {
      try {
        await userCollection.findOneAndUpdate(
          {
            _id: input.userId,
            "cart.productId": input.productId,
          },
          {
            $set: { "cart.$.count": input.count },
          },
          { new: true }
        );
        return { msg: "count successfully changed" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    async addToCompare(
      _: any,
      { input }: { input: { userId: string; title: string; productId: string } }
    ) {
      const { productId, title } = input;
      const res = await userCollection.findByIdAndUpdate(
        input.userId,
        {
          $push: { compare: { productId, title } },
        },
        { new: true }
      );

      const newCompared = res!.compare[res!.compare.length - 1] as any;
      newCompared.msg = "successfully added to your comparelist";
      return newCompared;
    },

    async removeFromCompare(
      _: any,
      { input }: { input: { userId: string; productId: string } }
    ) {
      const { productId } = input;
      const res = await userCollection.findByIdAndUpdate(
        input.userId,
        {
          $pull: { compare: { productId } },
        },
        { new: true }
      );

      return { msg: "successfully removed from your comparelist" };
    },

    addToFav: async (_: any, { input }: addToFavInterface) => {
      try {
        const res = await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $push: { fav: input },
          },
          { new: true }
        );
        console.log(res);
        return { ...res, msg: "successfully added to your favorites" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    removeFromFav: async (_: any, { input }: removeFromFavInterface) => {
      try {
        await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $pull: { fav: { productId: { $in: input.productId } } },
          },
          { new: true }
        );
        return { msg: "removed from your favorites" };
      } catch (err) {
        return (err as Error).message;
      }
    },
  },
};
