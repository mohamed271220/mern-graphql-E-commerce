import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
    }
  }
`;
