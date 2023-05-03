import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query {
    orders {
      _id
      state
      cost
      productId {
        id
        count
        image
        title
        price
      }
      userId
      count
      createdAt
      deliveredAt
    }
  }
`;
