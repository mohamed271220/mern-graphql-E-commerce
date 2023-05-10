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
  title: string;
  state: string;
  _id: string;
  stock: number;
  price: number;
  description: string;
  category: string;
  createdAt?: string;
}

interface reviewInterface {
  image: string;
  _id: string;
  user: string;
  userId: string;
  review: string;
  rate: number;
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
        console.log(args);

        const data = await productCollection.aggregate([
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
              avgRate: { $avg: "$rating" || 1 },
            },
          },
          {
            $match: {
              $or: [{ avgRate: { $lte: args.input.rate } }, { avgRate: null }],
              price: { $lte: args.input.price },
              category: { $in: args.input.category },
              state: { $in: args.input.state },
            },
          },
        ]);

        console.log(data);
        return data;
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

    async updateProduct(_: any, { input }: { input: productInterface }) {
      await productCollection.findByIdAndUpdate(input._id, input);
      return { msg: "product updated successfully", status: 200 };
    },
    async addProduct(
      _: any,
      { createInput }: { createInput: productInterface }
    ) {
      try {
        return await productCollection.create(createInput);
      } catch (err) {
        console.log(err);
      }
    },

    //reviews

    async addReview(_: any, { input }: { input: reviewInterface }) {
      try {
        const { userId, rate, review, image, user } = input;
        const data = await productCollection.findByIdAndUpdate(
          input._id,
          {
            $push: { reviews: { user, userId, rate, review, image } },
          },
          { new: true }
        );
        const addedReview = data!.reviews[data!.reviews.length - 1];
        addedReview.msg = "review added";
        addedReview.status = 200;
        return addedReview;
      } catch (err) {
        return (err as Error).message;
      }
    },
    async updateReview(_: any, { input }: any) {
      console.log(input);
      try {
        const { rate, review } = input;
        const data = await productCollection.findOneAndUpdate(
          {
            _id: input.productId,
            "reviews.userId": input.userId,
          },
          {
            $set: {
              "reviews.$.rate": rate,
              "reviews.$.review": review,
            },
          }
        );
        return { msg: "review updated successfully" };
      } catch (err) {
        return (err as Error).message;
      }
    },
  },
};
