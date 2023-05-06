import { gql } from "apollo-server-express";

export const StatusMsg = gql`
  type StatusMsg {
    msg: String
    status: Int
  }
`;
