import { gql } from "@apollo/client";

export const Remove_Order = gql`
  mutation ($_id: [ID!]) {
    deleteOrder(_id: $_id) {
      msg
    }
  }
`;

export const update_Order = gql`
  mutation ($_id: ID!, $state: String!, $deliveredAt: Date) {
    updateOrder(_id: $_id, state: $state, deliveredAt: $deliveredAt) {
      msg
    }
  }
`;
