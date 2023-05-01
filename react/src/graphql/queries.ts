import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query {
    orders {
      _id
      state
      cost
      productId
      userId
      count
    }
  }
`;
