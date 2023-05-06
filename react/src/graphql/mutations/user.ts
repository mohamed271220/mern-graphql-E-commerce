import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($input: AddUserInput) {
    addUser(input: $input) {
      name
      msg
      status
    }
  }
`;

export const Add_To_Cart = gql`
  mutation ($input: AddToCartInput) {
    addToCart(input: $input) {
      msg
    }
  }
`;

export const Change_Cart_Count = gql`
  mutation ($input: changeCartCountInput) {
    changeCartCount(input: $input) {
      msg
    }
  }
`;

export const AddTo_Compare = gql`
  mutation ($input: AddToCompareInput) {
    addToCompare(input: $input) {
      msg
      _id
    }
  }
`;

export const remove_From_Compare = gql`
  mutation ($input: removeFromCompareInput) {
    removeFromCompare(input: $input) {
      msg
      _id
    }
  }
`;

export const Add_To_Fav = gql`
  mutation ($input: AddToFavInput) {
    addToFav(input: $input) {
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
      compare {
        productId
        title
      }
    }
  }
`;

export const REMOVE_FROM_FAV = gql`
  mutation ($productId: [ID!], $userId: ID!) {
    removeFromFav(input: { userId: $userId, productId: $productId }) {
      msg
    }
  }
`;

export const REMOVE_FROM_Cart = gql`
  mutation ($productId: [ID!], $userId: ID!) {
    removeFromCart(input: { userId: $userId, productId: $productId }) {
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
