import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      msg
    }
  }
`;

export const Add_To_Cart = gql`
  mutation ($productId: ID!, $userId: ID!) {
    addToCart(count: 1, userId: $userId, productId: $productId) {
      msg
    }
  }
`;

export const Add_To_Fav = gql`
  mutation ($productId: ID!, $userId: ID!) {
    addToFav(userId: $userId, productId: $productId) {
      msg
    }
  }
`;

export const Authenticate_Query = gql`
  mutation ($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      msg
    }
  }
`;

export const GET_USER_DATA = gql`
  mutation ($id: ID!) {
    getUserData(id: $id) {
      email
      name
      fav {
        productId
      }
      favArr {
        images {
          productPath
        }
        price
        title
        _id
      }
      cart {
        count
        productId
      }
    }
  }
`;

export const REMOVE_FROM_FAV = gql`
  mutation ($productId: ID!, $userId: ID!) {
    removeFromFav(userId: $userId, productId: $productId) {
      msg
    }
  }
`;
