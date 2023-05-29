import { BlogCollection } from "./../../mongoose/schema/blog.js";

export const blogResolver = {
  Query: {
    blogs: {
      async blogs() {
        return BlogCollection.find({});
      },
      async blog(_: any, args: { id: string }) {
        return BlogCollection.findById(args.id);
      },
    },
  },
};
