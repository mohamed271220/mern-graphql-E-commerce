import { gql } from "@apollo/client";

export const getAllBlogs = gql`
  query {
    blogs {
      _id
      head
      image
      intro
      end
      content {
        title
        paragraph
      }
    }
  }
`;

export const getSingleBlog = gql`
  query ($id: ID) {
    blog(id: $id) {
      _id
      head
      image
      intro
      end
      content {
        title
        paragraph
      }
    }
  }
`;
