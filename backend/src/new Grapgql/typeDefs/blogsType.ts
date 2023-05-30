import { gql } from "apollo-server-express";

export const BlogDefType = gql`
  type BlogContent {
    title: String
    paragraph: String
  }
  type Blog {
    _id: ID
    head: String
    intro: String
    end: String
    image: String
    content: [BlogContent]
  }

  type Query {
    blogs: [Blog!]
    blog(id: ID): Blog!
  }
`;
