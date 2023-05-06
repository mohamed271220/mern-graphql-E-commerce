import productCollection from "../../mongoose/schema/product.js";

interface filterAllInterface {
  input: {
    state: string[];
    category: string[];
    price: number;
    rate: number;
  };
}

interface productInterface {
  input: {
    title: string;
    state: string;
    _id: string;
    stock: number;
    price: number;
    description: string;
    category: string;
    createdAt?: string;
  };
}

export const productResolver = {
  Query: {
    async products() {
      return await productCollection.find({});
    },
    async product(_: any, args: { id: string }) {
      return await productCollection.findById(args.id);
    },
  },
  Mutation: {
    async filterByPrice(_: any, args: { price: number }) {
      console.log(args);
      if (args.price === 1) {
        return productCollection.find({}).sort({ price: 1 });
      } else if (args.price === -1) {
        return productCollection.find({}).sort({ price: -1 });
      } else {
        console.log("by price");
        return productCollection.find({ price: { $lte: args.price } });
      }
    },

    async filterByDate(_: any, args: { date: number }) {
      if (args.date === 1) {
        return productCollection.find({}).sort({ createdAt: 1 });
      } else if (args.date === -1) {
        return productCollection.find({}).sort({ createdAt: -1 });
      }
    },
    filterByRate(_: any, args: { rate: 1 | -1 }) {
      return productCollection.aggregate([
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
            rateAvg: { $avg: "$rating" },
            avgReviewRating: { $avg: "$reviews.rate" },
          },
        },
        {
          $addFields: {
            avgRate: {
              $divide: [{ $add: ["$rateAvg", "$avgReviewRating"] }, 2],
            },
          },
        },
        { $sort: { avgRate: args.rate } },
      ]);
    },
    async filterBycatageory(_: any, args: { category: string }) {
      return productCollection.find({ category: args.category });
    },
    async filterByState(_: any, args: { state: string }) {
      return productCollection.find({ state: args.state });
    },
    async filterAllTypes(_: any, args: filterAllInterface) {
      try {
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
              avgRate: { $lte: args.input.rate },
              price: { $lte: args.input.price },
              category: { $in: args.input.category },
              state: { $in: args.input.state },
            },
          },
        ]);
      } catch (err) {
        console.log((err as Error).message);
      }
    },
    async searchProducts(_: any, args: { word: string }) {
      console.log(args);
      return await productCollection.find({
        $or: [
          { category: { $regex: args.word, $options: "i" } },
          { title: { $regex: args.word, $options: "i" } },
        ],
      });
    },

    async updateProduct(_: any, { input }: productInterface) {
      await productCollection.findByIdAndUpdate(input._id, input);
      return { msg: "product updated successfully", status: 200 };
    },
    async addProduct(_: any, { input }: productInterface) {
      console.log(input);
      return productCollection.create({ ...input, deliveredAt: null });
    },
  },
};
