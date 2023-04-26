import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $country: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      country: $country
    ) {
      name
      msg
      status
    }
  }
`;

export const Add_To_Cart = gql`
  mutation (
    $productId: ID!
    $parentId: ID!
    $userId: ID!
    $path: String!
    $title: String!
    $price: Int!
  ) {
    addToCart(
      count: 1
      userId: $userId
      productId: $productId
      parentId: $parentId
      path: $path
      title: $title
      price: $price
    ) {
      msg
    }
  }
`;

export const Change_Cart_Count = gql`
  mutation ($productId: ID!, $userId: ID!, $count: Int!) {
    changeCartCount(count: $count, userId: $userId, productId: $productId) {
      msg
    }
  }
`;

export const Add_To_Fav = gql`
  mutation (
    $productId: ID!
    $parentId: ID!
    $userId: ID!
    $price: Int!
    $path: String!
    $title: String!
  ) {
    addToFav(
      productId: $productId
      parentId: $parentId
      userId: $userId
      path: $path
      title: $title
      price: $price
    ) {
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
      image
      country
      phone
      fav {
        productId
        price
        title
        path
        parentId
        _id
      }

      cart {
        count
        productId
        price
        title
        parentId

        path
        _id
      }
    }
  }
`;

export const REMOVE_FROM_FAV = gql`
  mutation ($productId: [ID!], $userId: ID!) {
    removeFromFav(userId: $userId, productId: $productId) {
      msg
    }
  }
`;

export const REMOVE_FROM_Cart = gql`
  mutation ($productId: [ID!], $userId: ID!) {
    removeFromCart(userId: $userId, productId: $productId) {
      msg
    }
  }
`;

export const addReview = gql`
  mutation (
    $_id: ID!
    $userId: ID!
    $rate: Int!
    $review: String!
    $image: String!
  ) {
    addReview(
      userId: $userId
      _id: $_id
      rate: $rate
      review: $review
      image: $image
    ) {
      msg
      review
      rate
      userId
      status
      _id
    }
  }
`;

export const Update_user_name = gql`
  mutation ($_id: ID!, $name: String!) {
    updateUserName(name: $name, _id: $_id) {
      msg
      status
    }
  }
`;
export const Update_Country = gql`
  mutation ($_id: ID!, $country: String!) {
    updateUserCountry(country: $country, _id: $_id) {
      msg
      status
    }
  }
`;

export const Update_User_Phone = gql`
  mutation ($_id: ID!, $phone: String!) {
    updateUserPhone(phone: $phone, _id: $_id) {
      msg
      status
    }
  }
`;

export const Update_User_Email = gql`
  mutation ($_id: ID!, $email: String!) {
    updateEmail(email: $email, _id: $_id) {
      msg
      status
    }
  }
`;

export const Check_Old_Pass = gql`
  mutation ($_id: ID!, $password: String!) {
    checkOldPassword(password: $password, _id: $_id) {
      msg
      status
    }
  }
`;

export const Update_Pass = gql`
  mutation ($_id: ID!, $password: String!) {
    updatePassword(password: $password, _id: $_id) {
      msg
      status
    }
  }
`;
