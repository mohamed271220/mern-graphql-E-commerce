import { BlogCollection } from "./../../mongoose/schema/blog.js";

export const blogResolver = {
  Query: {
    async blogs() {
      return await BlogCollection.find({});
    },
    async blog(_: any, args: { id: string }) {
      return await BlogCollection.findById(args.id);
    },
  },
};
