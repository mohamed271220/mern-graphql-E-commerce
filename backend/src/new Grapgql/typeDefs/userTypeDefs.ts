import { StatusMsg } from "./../types/statusMsg";
import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  ${StatusMsg}

  type Fav {
    productId: ID
    parentId: ID
    _id: ID
    path: String
    price: Float
    title: String
    msg: String
  }

  type Cart {
    productId: ID
    parentId: ID
    count: Int
    _id: ID
    path: String
    price: Float
    title: String
    msg: String
  }

  type Compare {
    productId: ID
    _id: ID
    title: String
    msg: String
    state: String
  }

  type User {
    _id: ID
    name: String
    image: String
    email: String
    password: String
    msg: String
    country: String
    phone: String
    status: Int
    fav: [Fav]
    cart: [Cart]
    compare: [Compare]
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
    country: String!
    image: String
  }

  input AddToCartInput {
    userId: ID
    productId: ID
    parentId: ID
    count: Int
    title: String
    path: String
    price: Float
  }

  input removeFromCartInput {
    productId: [ID!]
    userId: ID!
  }
  input changeCartCountInput {
    productId: ID
    userId: ID!
    count: Int
  }

  input AddToCompareInput {
    userId: ID
    productId: ID
    title: String
  }

  input removeFromCompareInput {
    userId: ID
    productId: ID
  }

  input AddToFavInput {
    productId: ID
    parentId: ID
    title: String
    path: String
    price: Float
    userId: ID
  }

  input RemoveFromFavInput {
    productId: [ID!]
    userId: ID!
  }

  type Mutation {
    addUser(input: AddUserInput): User
    authenticate(password: String!, email: String!): StatusMsg
    getUserData(id: ID!): User
    addToCart(input: AddToCartInput): Cart
    removeFromCart(input: removeFromCartInput): StatusMsg
    changeCartCount(input: changeCartCountInput): StatusMsg
    addToCompare(input: AddToCompareInput): Compare
    removeFromCompare(input: removeFromCompareInput): Compare
    addToFav(input: AddToFavInput): Fav
    removeFromFav(input: RemoveFromFavInput): StatusMsg
  }
`;
