import { shield } from "graphql-shield";
import { isUser } from "./rules";

export const permissions = shield({
  Query: {},
  Mutation: {
    addToFav: isUser,
    removeFromFav: isUser,
    addToCompare: isUser,
    removeFromCompare: isUser,
    removeFromCart: isUser,
    addToCart: isUser,
    updateOrder: isUser,
    deleteOrder: isUser,
  },
});
