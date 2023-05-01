import { gql } from "@apollo/client";

export const FILTER_BY_PRICE = gql`
  mutation ($price: Int!) {
    filterByPrice(price: $price) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_BY_STATE = gql`
  mutation ($state: String!) {
    filterByState(state: $state) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_BY_Catagroy = gql`
  mutation ($category: String!) {
    filterBycatageory(category: $category) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_BY_Rate = gql`
  mutation ($rate: Int!) {
    filterByRate(rate: $rate) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      state
      title
      description
      rating
      category

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_All = gql`
  mutation (
    $rate: Int!
    $price: Int!
    $category: [String!]
    $state: [String!]
  ) {
    filterAllTypes(
      rate: $rate
      price: $price
      category: $category
      state: $state
    ) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      state
      title
      description
      rating
      category

      images {
        productPath
        _id
      }
    }
  }
`;

export const Search_Mutaion = gql`
  mutation ($word: String!) {
    searchProducts(word: $word) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const update_Product = gql`
  mutation (
    $title: String!
    $state: String!
    $category: String!
    $description: String!
    $_id: ID!
    $stock: Int!
    $price: Float!
  ) {
    updateProduct(
      title: $title
      state: $state
      category: $category
      description: $description
      _id: $_id
      stock: $stock
      price: $price
    ) {
      msg
      # status
    }
  }
`;

export const Add_Product = gql`
  mutation (
    $title: String!
    $state: String!
    $category: String!
    $description: String!
    $stock: Int!
    $price: Int!
  ) {
    addProduct(
      title: $title
      state: $state
      category: $category
      description: $description
      stock: $stock
      price: $price
    ) {
      _id
    }
  }
`;
