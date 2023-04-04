import { gql } from "@apollo/client";

export const GET_Product_By_Id = gql`
  query {
    product(id: "642a06258b0a1b45ebf05639") {
      _id
      price
      stock
      title
      description
      rating
      category
      images {
        productPath
      }
    }
  }
`;
