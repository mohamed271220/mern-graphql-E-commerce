import "../types/Date.js";
import { StatusMsg } from "./../types/statusMsg.js";
import { gql } from "apollo-server-express";

export const orderDefType = gql`
  scalar Date
  ${StatusMsg}

  type OrderProduct {
    id: ID
    image: String
    price: Float
    title: String
    count: Int
  }

  type Order {
    _id: ID!
    userId: ID!
    state: String!
    msg: String
    productId: [OrderProduct]
    count: Int!
    cost: Float!
    createdAt: Date
    deliveredAt: Date
  }

  type Query {
    orders: [Order]
    order(id: ID!): Order
  }

  input updateOrderInput {
    _id: ID
    state: String
    deliveredAt: Date
  }
  type Mutation {
    updateOrder(input: updateOrderInput): Order
    deleteOrder(_id: [ID!]): Order
  }
`;
